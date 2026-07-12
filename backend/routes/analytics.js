const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Vehicle = require("../models/Vehicle");
const Part = require("../models/Part");
const Order = require("../models/Order");
const Article = require("../models/Article");

// ==========================
// Dashboard Analytics
// ==========================
router.get("/", async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalVendors = await User.countDocuments({ role: "vendor" });
    const pendingVendors = await User.countDocuments({
      role: "vendor",
      approvalStatus: "pending"
    });

    const totalVehicles = await Vehicle.countDocuments();
    const totalParts = await Part.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalArticles = await Article.countDocuments();

    res.status(200).json({
      totalCustomers,
      totalVendors,
      pendingVendors,
      totalVehicles,
      totalParts,
      totalOrders,
      totalArticles
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;