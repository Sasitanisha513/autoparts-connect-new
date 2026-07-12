const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// ==========================
// PROFILE IMAGE UPLOAD SETUP
// ==========================

const storage = multer.diskStorage({

  destination: function (
    req,
    file,
    cb
  ) {

    cb(
      null,
      "uploads/"
    );

  },

  filename: function (
    req,
    file,
    cb
  ) {

    const uniqueName =

      Date.now() +

      "-" +

      Math.round(
        Math.random() * 1e9
      );


    cb(

      null,

      "profile-" +

      uniqueName +

      path.extname(
        file.originalname
      )

    );

  },

});


const upload = multer({

  storage: storage,

  fileFilter: function (
    req,
    file,
    cb
  ) {

    const allowedTypes = [

      "image/jpeg",

      "image/jpg",

      "image/png",

      "image/webp",

    ];


    if (
      allowedTypes.includes(
        file.mimetype
      )
    ) {

      cb(
        null,
        true
      );

    } else {

      cb(

        new Error(

          "Only JPG, PNG and WEBP images are allowed."

        ),

        false

      );

    }

  },

});

// ==========================
// REGISTER
// ==========================
router.post(
  "/register",
  upload.single("profileImage"),
  async (req, res) => {
  try {
    const {
  name,
  email,
  password,
  role,
  businessName,
  registrationNo,
  businessAddress,
  outletLocation,
  phone,
  nic,
} = req.body;

    // Check whether user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Admin accounts cannot be created from Register Page
    if (role === "admin") {
      return res.status(403).json({
        message: "Admin accounts cannot be registered.",
      });
}

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    // Customer = approved
    // Vendor = pending
    let approvalStatus = "approved";

    if (role === "vendor") {
      approvalStatus = "pending";
    }

    // Create new user
  const profileImagePath = req.file
  ? `/uploads/${req.file.filename}`
  : "";


const newUser = new User({

  name,

  email,

  password:
    hashedPassword,

  role:
    role || "customer",

  approvalStatus,

  businessName:
    businessName || "",

  registrationNo:
    registrationNo || "",

  businessAddress:
    businessAddress || "",

  outletLocation:
    outletLocation || "",

  phone:
    phone || "",

  nic:
    nic || "",

  address:
    req.body.address || "",

  profileImage:
    profileImagePath,

});

    // Save user in MongoDB
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      role: newUser.role,
      approvalStatus: newUser.approvalStatus,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// ==========================
// LOGIN
// ==========================
router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find user using email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // Check selected account type
    if (role && user.role !== role) {
      return res.status(403).json({
        message:
          "Please select the correct account type.",
      });
    }

    // Check vendor approval status
    if (
      user.role === "vendor" &&
      user.approvalStatus !== "approved"
    ) {
      return res.status(403).json({
        message:
          "Your vendor account is waiting for admin approval.",
      });
    }

    // Create login token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      "autoparts_secret_key",
      {
        expiresIn: "1d",
      }
    );

    // Send login response
    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
// ==========================
// AUTH MIDDLEWARE
// ==========================

const verifyToken = (
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;


    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {

      return res.status(401).json({

        message:
          "Please log in to access your account.",

      });

    }


    const token =
      authHeader.split(" ")[1];


    const decoded =
      jwt.verify(

        token,

        "autoparts_secret_key"

      );


    req.user = decoded;


    next();


  } catch (error) {

    return res.status(401).json({

      message:
        "Your login session is invalid or expired.",

    });

  }

};


// ==========================
// GET LOGGED-IN USER PROFILE
// ==========================

router.get(
  "/profile",

  verifyToken,

  async (req, res) => {

    try {

      const user =
        await User.findById(

          req.user.id

        ).select("-password");


      if (!user) {

        return res
          .status(404)
          .json({

            message:
              "User account not found.",

          });

      }


      res.status(200).json(

        user

      );


    } catch (error) {

      res.status(500).json({

        error:
          error.message,

      });

    }

  }

);


// ==========================
// UPDATE LOGGED-IN USER PROFILE
// ==========================

router.put(
  "/profile",

  verifyToken,

  async (req, res) => {

    try {

      const {

        name,

        email,

        phone,

        address,

        businessName,

        registrationNo,

        businessAddress,

        outletLocation,

        nic,

        description,

      } = req.body;


      // ==========================
      // CHECK DUPLICATE EMAIL
      // ==========================

      if (email) {

        const existingEmail =
          await User.findOne({

            email:
              email.toLowerCase(),

            _id: {

              $ne:
                req.user.id,

            },

          });


        if (existingEmail) {

          return res
            .status(400)
            .json({

              message:
                "This email address is already used by another account.",

            });

        }

      }


      // ==========================
      // CREATE UPDATE DETAILS
      // ==========================

      const updateData = {};


      if (
        name !== undefined
      ) {

        updateData.name =
          name;

      }


      if (
        email !== undefined
      ) {

        updateData.email =
          email.toLowerCase();

      }


      if (
        phone !== undefined
      ) {

        updateData.phone =
          phone;

      }


      if (
        address !== undefined
      ) {

        updateData.address =
          address;

      }


      if (
        businessName !== undefined
      ) {

        updateData.businessName =
          businessName;

      }


      if (
        registrationNo !== undefined
      ) {

        updateData.registrationNo =
          registrationNo;

      }


      if (
        businessAddress !== undefined
      ) {

        updateData.businessAddress =
          businessAddress;

      }


      if (
        outletLocation !== undefined
      ) {

        updateData.outletLocation =
          outletLocation;

      }


      if (
        nic !== undefined
      ) {

        updateData.nic =
          nic;

      }


      if (
        description !== undefined
      ) {

        updateData.description =
          description;

      }


      // ==========================
      // UPDATE MONGODB
      // ==========================

      const updatedUser =

        await User.findByIdAndUpdate(

          req.user.id,

          updateData,

          {

            new: true,

            runValidators: true,

          }

        ).select("-password");


      if (!updatedUser) {

        return res
          .status(404)
          .json({

            message:
              "User account not found.",

          });

      }


      res.status(200).json({

        message:
          "Profile updated successfully.",

        user:
          updatedUser,

      });


    } catch (error) {


      console.log(

        "Profile update error:",

        error

      );


      res.status(500).json({

        message:

          "Profile could not be updated.",

        error:
          error.message,

      });

    }

  }

);
// ==========================
// UPDATE PROFILE IMAGE
// ==========================

router.put(

  "/profile/image",

  verifyToken,

  upload.single("profileImage"),

  async (req, res) => {

    try {


      if (!req.file) {

        return res
          .status(400)
          .json({

            message:
              "Please select a profile image.",

          });

      }


      const imagePath =

        `/uploads/${req.file.filename}`;


      const updatedUser =

        await User.findByIdAndUpdate(

          req.user.id,

          {

            profileImage:
              imagePath,

          },

          {

            new: true,

          }

        ).select("-password");


      if (!updatedUser) {

        return res
          .status(404)
          .json({

            message:
              "User account not found.",

          });

      }


      res.status(200).json({

        message:
          "Profile image updated successfully.",

        profileImage:
          updatedUser.profileImage,

        user:
          updatedUser,

      });


    } catch (error) {


      res.status(500).json({

        error:
          error.message,

      });


    }

  }

);
// ==========================
// FORGOT PASSWORD
// ==========================

router.put(
  "/forgot-password",
  async (req, res) => {

    try {

      const {
        email,
        newPassword,
      } = req.body;


      // Check required fields

      if (
        !email ||
        !newPassword
      ) {

        return res
          .status(400)
          .json({

            message:
              "Email and new password are required.",

          });

      }


      // Check password length

      if (
        newPassword.length < 6
      ) {

        return res
          .status(400)
          .json({

            message:
              "Password must contain at least 6 characters.",

          });

      }


      // Find account using email

      const user =
        await User.findOne({

          email:
            email.toLowerCase(),

        });


      if (!user) {

        return res
          .status(404)
          .json({

            message:
              "No account was found with this email address.",

          });

      }


      // Do not allow admin password
      // reset through public page

      if (
        user.role === "admin"
      ) {

        return res
          .status(403)
          .json({

            message:
              "Admin passwords cannot be reset from this page.",

          });

      }


      // Encrypt new password

      const salt =
        await bcrypt.genSalt(10);


      const hashedPassword =
        await bcrypt.hash(

          newPassword,

          salt

        );


      // Update password

      user.password =
        hashedPassword;


      await user.save();


      res
        .status(200)
        .json({

          message:
            "Your password has been updated successfully.",

        });


    } catch (error) {

      console.log(

        "Forgot password error:",

        error

      );


      res
        .status(500)
        .json({

          message:
            "Password could not be updated. Please try again.",

        });

    }

  }
);
module.exports = router;