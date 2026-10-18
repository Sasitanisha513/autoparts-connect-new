const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Part = require("../models/Part");

// ==========================
// Place Order
// ==========================
router.post("/place", async (req, res) => {
  try {
    const order = new Order(req.body);

    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// ==========================
// View All Orders
// ==========================
router.get("/", async (req, res) => {
  try {
const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// ==========================
// View Customer Orders
// ==========================
router.get("/customer/:customerId", async (req, res) => {

  try {

    const orders = await Order.find({
      customerId: req.params.customerId,
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});

// ==========================
// Order Status Summary
// ==========================
router.get("/status-summary", async (req, res) => {
  try {
    const summary = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
// ==========================
// Monthly Top Selling Parts
// ==========================

router.get("/top-selling-parts", async (req, res) => {

  try {

    const month = Number(req.query.month);

   let match = {
  status: "Completed",
};

if (month) {

  match = {
    status: "Completed",

    $expr: {
      $eq: [
        { $month: "$createdAt" },
        month,
      ],
    },
  };

}

    const topParts = await Order.aggregate([

      {

        $match: match,

      },

      {

        $unwind: "$items",

      },

      {

        $group: {

          _id: "$items.partName",

          totalSold: {

            $sum: "$items.quantity",

          },

        },

      },

      {

        $sort: {

          totalSold: -1,

        },

      },

      {

        $limit: 5,

      },

    ]);

    res.json(topParts);

  } catch (error) {

    res.status(500).json({

      error: error.message,

    });

  }

});

// ==========================
// Update Order Status
// ==========================
router.put("/:id", async (req, res) => {
  try {

    const existingOrder = await Order.findById(req.params.id);

    if (!existingOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const oldStatus = existingOrder.status;
    const newStatus = req.body.status;

    existingOrder.status = newStatus;
    await existingOrder.save();

    if (
      oldStatus !== "Completed" &&
      newStatus === "Completed"
    ) {

      for (const item of existingOrder.items) {

        const part = await Part.findOne({
          partName: item.partName,
        });

        if (part) {

          part.stock = Math.max(
            part.stock - item.quantity,
            0
          );

          part.availability = part.stock > 0;

          await part.save();

        }

      }

    }

    res.status(200).json({
      message: "Order updated successfully",
      order: existingOrder,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});

// ==========================
// Customer Cancel Order
// ==========================
router.put("/cancel/:id", async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    if (!order) {

      return res.status(404).json({
        message: "Order not found",
      });

    }

    if (order.status !== "Pending") {

      return res.status(400).json({
        message: "Only pending orders can be cancelled.",
      });

    }

    order.status = "Cancelled";

    await order.save();

    res.status(200).json({
      message: "Order cancelled successfully.",
      order,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});

// ==========================
// Delete Order
// ==========================
router.delete("/:id", async (req, res) => {
  try {

    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});

// ==========================
// Vendor Monthly Report
// ==========================

router.get("/vendor-report", async (req, res) => {

  try {

    const month = Number(req.query.month);

    let filter = {};

    if (month) {

      filter = {

        $expr: {
          $eq: [
            { $month: "$createdAt" },
            month
          ]
        }

      };

    }

   const orders = await Order.find({
  ...filter,
  status: "Completed",
});

    const totalSales = orders.reduce(

      (sum, order) =>

        sum + order.totalAmount,

      0

    );

    const totalOrders = orders.length;

    const totalProducts = await Part.countDocuments();

    const lowStock = await Part.countDocuments({

      stock: {

        $gt: 0,

        $lte: 10,

      },

    });

    const outOfStock = await Part.countDocuments({

      stock: 0,

    });

    res.json({

      totalSales,

      totalOrders,

      totalProducts,

      lowStock,

      outOfStock,

    });

  } catch (error) {

    res.status(500).json({

      error: error.message,

    });

  }

});
module.exports = router;