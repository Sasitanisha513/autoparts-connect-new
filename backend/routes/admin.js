const express = require("express");

const router = express.Router();

const User = require(
  "../models/User"
);

// ===============================
// GET ALL VENDORS
// ===============================

router.get("/vendors", async (req, res) => {

  try {

    const vendors = await User.find({

      role: "vendor",

    }).select("-password");


    res.status(200).json(

      vendors

    );


  } catch (error) {

    res.status(500).json({

      message:
        "Vendor information could not be loaded.",

      error:
        error.message,

    });

  }

});

// ===============================
// GET ALL VENDORS
// Pending + Approved + Rejected
// ===============================

router.get(
  "/vendors",

  async (req, res) => {

    try {

      const vendors =
        await User.find({

          role: "vendor",

        })

          .select("-password")

          .sort({

            createdAt: -1,

          });


      res
        .status(200)
        .json(vendors);


    } catch (error) {

      res
        .status(500)
        .json({

          message:
            "Unable to load vendors.",

          error:
            error.message,

        });

    }

  }

);


// ===============================
// GET ALL PENDING VENDORS
// ===============================

router.get(
  "/pending-vendors",

  async (req, res) => {

    try {

      const vendors =
        await User.find({

          role:
            "vendor",

          approvalStatus:
            "pending",

        })

          .select("-password")

          .sort({

            createdAt: -1,

          });


      res
        .status(200)
        .json(vendors);


    } catch (error) {

      res
        .status(500)
        .json({

          message:
            "Unable to load pending vendors.",

          error:
            error.message,

        });

    }

  }

);


// ===============================
// APPROVE VENDOR
// ===============================

router.put(
  "/approve-vendor/:id",

  async (req, res) => {

    try {

      const vendor =

        await User
          .findOneAndUpdate(

            {

              _id:
                req.params.id,

              role:
                "vendor",

            },

            {

              approvalStatus:
                "approved",

            },

            {

              new:
                true,

              runValidators:
                true,

            }

          )

          .select(
            "-password"
          );


      if (!vendor) {

        return res
          .status(404)
          .json({

            message:
              "Vendor account not found.",

          });

      }


      res
        .status(200)
        .json({

          message:
            "Vendor approved successfully.",

          vendor,

        });


    } catch (error) {

      res
        .status(500)
        .json({

          message:
            "Vendor approval failed.",

          error:
            error.message,

        });

    }

  }

);


// ===============================
// REJECT VENDOR
// ===============================

router.put(
  "/reject-vendor/:id",

  async (req, res) => {

    try {

      const vendor =

        await User
          .findOneAndUpdate(

            {

              _id:
                req.params.id,

              role:
                "vendor",

            },

            {

              approvalStatus:
                "rejected",

            },

            {

              new:
                true,

              runValidators:
                true,

            }

          )

          .select(
            "-password"
          );


      if (!vendor) {

        return res
          .status(404)
          .json({

            message:
              "Vendor account not found.",

          });

      }


      res
        .status(200)
        .json({

          message:
            "Vendor rejected successfully.",

          vendor,

        });


    } catch (error) {

      res
        .status(500)
        .json({

          message:
            "Vendor rejection failed.",

          error:
            error.message,

        });

    }

  }

);


module.exports = router;