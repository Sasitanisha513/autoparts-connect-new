const express = require("express");
const router = express.Router();
const Part = require("../models/Part");

const multer = require("multer");
const path = require("path");

// ==========================
// Image Upload Configuration
// ==========================

const storage = multer.diskStorage({

  destination: function (
    req,
    file,
    cb
  ) {

    cb(null, "uploads/");

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
        Math.random() * 1000000
      );

    cb(
      null,
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

      cb(null, true);

    } else {

      cb(
        new Error(
          "Only JPG, PNG and WEBP images are allowed."
        )
      );

    }

  },

});

// ==========================
// Add Part
// ==========================
router.post(
  "/add",
  upload.single("image"),
  async (req, res) => {

    try {

      const partData = {
        ...req.body,

        image: req.file
          ? `/uploads/${req.file.filename}`
          : "",

      };


      const part =
        new Part(partData);


      await part.save();


      res.status(201).json({

        message:
          "Product saved successfully.",

        part,

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
// Get All Parts
// ==========================
router.get("/", async (req, res) => {
  try {
    const parts = await Part.find();
    res.status(200).json(parts);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
// ==========================
// Low Stock Parts
// ==========================

router.get("/low-stock", async (req, res) => {

  try {

    const parts = await Part.find({
      stock: {
        $gt: 0,
        $lte: 10
      }
    });

    res.status(200).json(parts);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

// ==========================
// Out of Stock Parts
// ==========================

router.get("/out-of-stock", async (req, res) => {

  try {

    const parts = await Part.find({
      stock: 0
    });

    res.status(200).json(parts);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }

});

// ==========================
// Get Single Part
// ==========================
router.get("/:id", async (req, res) => {
  try {

    const part = await Part.findById(req.params.id);

    if (!part) {
      return res.status(404).json({
        message: "Part not found"
      });
    }

    res.status(200).json(part);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// ==========================
// Search Parts
// ==========================
router.get("/search/:keyword", async (req, res) => {
  try {

    const keyword = req.params.keyword;

    const parts = await Part.find({
      $or: [
        {
          partName: {
            $regex: keyword,
            $options: "i"
          }
        },
        {
          vehicle: {
            $regex: keyword,
            $options: "i"
          }
        }
      ]
    });

    res.status(200).json(parts);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});
// ==========================
// Compare Prices
// ==========================
router.get("/compare/:partName", async (req, res) => {
  try {
    const partName = req.params.partName;

    const parts = await Part.find({
      partName: {
        $regex: partName,
        $options: "i"
      }
    }).select("partName supplier price vehicle condition");

    res.status(200).json(parts);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// ==========================
// Update Part With Image
// ==========================

router.put(
  "/:id",
  upload.single("image"),
  async (req, res) => {

    try {

      const updateData = {
        ...req.body,
      };

      // The image path is updated only
      // if a new image is uploaded.

      if (req.file) {

        updateData.image =
          `/uploads/${req.file.filename}`;

      }

      const part =
        await Part.findByIdAndUpdate(

          req.params.id,

          updateData,

          {
            new: true,
            runValidators: true,
          }

        );


      if (!part) {

        return res.status(404).json({

          message:
            "Product not found.",

        });

      }


      res.status(200).json({

        message:
          "Product updated successfully.",

        part,

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
// Delete Part
// ==========================
router.delete("/:id", async (req, res) => {
  try {

    await Part.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Part deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;