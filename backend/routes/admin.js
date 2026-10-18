const express = require("express");

const router = express.Router();

const User = require(
  "../models/User"
);
const Vehicle = require("../models/Vehicle");
const Order = require("../models/Order");
const Part = require("../models/Part");

// =====================================
// GET ALL VENDORS
// Pending + Approved + Rejected
// =====================================

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


// =====================================
// GET ALL PENDING VENDORS
// =====================================

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


// =====================================
// APPROVE VENDOR
// =====================================

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


// =====================================
// REJECT VENDOR
// =====================================

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


// =====================================
// GET ALL CUSTOMERS
// =====================================

router.get(
  "/users",

  async (req, res) => {

    try {

      const users =

        await User.find({

          role:
            "customer",

        })

          .select(
            "-password"
          )

          .sort({

            createdAt:
              -1,

          });


      res
        .status(200)
        .json(users);


    } catch (error) {

      res
        .status(500)
        .json({

          message:
            "Unable to load customer accounts.",

          error:
            error.message,

        });

    }

  }

);


// =====================================
// UPDATE CUSTOMER
// =====================================

router.put(
  "/users/:id",

  async (req, res) => {

    try {

      const {

        name,

        email,

        accountStatus,

      } = req.body;


      const user =

        await User
          .findOneAndUpdate(

            {

              _id:
                req.params.id,

              role:
                "customer",

            },

            {

              name,

              email,

              accountStatus,

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


      if (!user) {

        return res
          .status(404)
          .json({

            message:
              "Customer account not found.",

          });

      }


      res
        .status(200)
        .json({

          message:
            "Customer account updated successfully.",

          user,

        });


    } catch (error) {

      // Duplicate email error

      if (

        error.code
        === 11000

      ) {

        return res
          .status(400)
          .json({

            message:
              "This email address is already registered.",

          });

      }


      res
        .status(500)
        .json({

          message:
            "Customer account update failed.",

          error:
            error.message,

        });

    }

  }

);


// =====================================
// DELETE CUSTOMER
// =====================================

router.delete(
  "/users/:id",

  async (req, res) => {

    try {

      const user =

        await User
          .findOneAndDelete({

            _id:
              req.params.id,

            role:
              "customer",

          });


      if (!user) {

        return res
          .status(404)
          .json({

            message:
              "Customer account not found.",

          });

      }


      res
        .status(200)
        .json({

          message:
            "Customer account deleted successfully.",

        });


    } catch (error) {

      res
        .status(500)
        .json({

          message:
            "Customer account deletion failed.",

          error:
            error.message,

        });

    }

  }

);

// =====================================
// GET ALL CUSTOMER USERS
// =====================================

router.get(
  "/users",
  async (req, res) => {

    try {

      const users = await User.find({

        role: "customer",

      })

        .select("-password")

        .sort({

          createdAt: -1,

        });


      res.status(200).json(

        users

      );


    } catch (error) {

      res.status(500).json({

        message:
          "Unable to load customer accounts.",

        error:
          error.message,

      });

    }

  }
);


// =====================================
// GET ONE CUSTOMER USER
// =====================================

router.get(
  "/users/:id",
  async (req, res) => {

    try {

      const user = await User
        .findOne({

          _id: req.params.id,

          role: "customer",

        })

        .select("-password");


      if (!user) {

        return res
          .status(404)
          .json({

            message:
              "Customer account not found.",

          });

      }


      res.status(200).json(

        user

      );


    } catch (error) {

      res.status(500).json({

        message:
          "Unable to load customer details.",

        error:
          error.message,

      });

    }

  }
);


// =====================================
// UPDATE CUSTOMER USER
// =====================================

router.put(
  "/users/:id",
  async (req, res) => {

    try {

      const {

        name,

        email,

        status,

      } = req.body;


      const updatedUser =

        await User.findOneAndUpdate(

          {

            _id: req.params.id,

            role: "customer",

          },

          {

            name,

            email,

            status,

          },

          {

            new: true,

            runValidators: true,

          }

        )

          .select("-password");


      if (!updatedUser) {

        return res
          .status(404)
          .json({

            message:
              "Customer account not found.",

          });

      }


      res.status(200).json({

        message:
          "Customer account updated successfully.",

        user:
          updatedUser,

      });


    } catch (error) {

      res.status(500).json({

        message:
          "Customer account update failed.",

        error:
          error.message,

      });

    }

  }
);


// =====================================
// DELETE CUSTOMER USER
// =====================================

router.delete(
  "/users/:id",
  async (req, res) => {

    try {

      const deletedUser =

        await User.findOneAndDelete({

          _id: req.params.id,

          role: "customer",

        });


      if (!deletedUser) {

        return res
          .status(404)
          .json({

            message:
              "Customer account not found.",

          });

      }


      res.status(200).json({

        message:
          "Customer account deleted successfully.",

      });


    } catch (error) {

      res.status(500).json({

        message:
          "Customer account deletion failed.",

        error:
          error.message,

      });

    }

  }
);

// =====================================
// ADMIN DASHBOARD
// =====================================

router.get("/dashboard", async (req, res) => {
  try {

    const totalVendors = await User.countDocuments({
      role: "vendor",
      approvalStatus: "approved",
    });

    const totalCustomers = await User.countDocuments({
      role: "customer",
    });

    const totalVehicles = await Vehicle.countDocuments();

    const totalOrders = await Order.countDocuments();

const totalParts = await Part.countDocuments();

const totalRevenueResult = await Order.aggregate([
  {
    $group: {
      _id: null,
      totalRevenue: {
        $sum: "$totalAmount",
      },
    },
  },
]);

const totalRevenue =
  totalRevenueResult.length > 0
    ? totalRevenueResult[0].totalRevenue
    : 0;

   res.status(200).json({
  totalVendors,
  totalCustomers,
  totalVehicles,
  totalParts,
  totalOrders,
  totalRevenue,
});

  } catch (error) {

    res.status(500).json({
      message: "Unable to load dashboard.",
      error: error.message,
    });

  }
});


router.get("/test", (req, res) => {
  res.json({ message: "Admin route is working" });
});

// =====================================
// RECENT ACTIVITIES
// =====================================

router.get("/recent-activities", async (req, res) => {
  try {

    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const vehicles = await Vehicle.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const parts = await Part.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const activities = [];

    users.forEach((user) => {
     activities.push({
  user: user.name,
  activity:
    user.role === "vendor"
      ? "Registered as Vendor"
      : "Registered as Customer",

  status:
    user.role === "vendor"
      ? (user.approvalStatus === "approved"
          ? "completed"
          : "pending")
      : "completed",

  createdAt: user.createdAt,
});
    });

    vehicles.forEach((vehicle) => {
      activities.push({
        user: vehicle.brand,
        activity: "Added New Vehicle",
        status: "completed",
        createdAt: vehicle.createdAt,
      });
    });

    parts.forEach((part) => {
      activities.push({
        user: part.supplier,
        activity: "Added New Spare Part",
        status: "completed",
        createdAt: part.createdAt,
      });
    });

    orders.forEach((order) => {
      activities.push({
        user: order.customerName,
        activity: "Placed New Order",
        status: order.status.toLowerCase(),
        createdAt: order.createdAt,
      });
    });

    activities.sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );

    res.json(
      activities.slice(0, 8)
    );

  } catch (error) {

    res.status(500).json({
      message:
        "Unable to load recent activities.",
      error: error.message,
    });

  }
});

// Monthly Orders Statistics
router.get("/monthly-orders", async (req, res) => {
  try {

    const monthlyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const result = new Array(12).fill(0);

    monthlyOrders.forEach(item => {
      result[item._id - 1] = item.total;
    });

    res.json({
      labels: months,
      data: result
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server Error" });

  }
});


module.exports = router;