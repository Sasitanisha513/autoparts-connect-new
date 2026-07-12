const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

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
    const orders = await Order.find();

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// ==========================
// Update Order Status
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Order updated successfully",
      order
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;