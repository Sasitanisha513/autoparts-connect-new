const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");

const Part = require("../models/Part");
const Order = require("../models/Order");

// ==========================
// Generate Sales & Inventory PDF Report
// ==========================
router.get("/pdf", async (req, res) => {
  try {
    const parts = await Part.find();
    const orders = await Order.find();

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Sales_Inventory_Report.pdf"
    );

    doc.pipe(res);

    // Title
    doc.fontSize(20).text("Auto Parts Sales & Inventory Report", {
      align: "center",
    });

    doc.moveDown();

    // Inventory
    doc.fontSize(16).text("Inventory");

    parts.forEach((part) => {
      doc
        .fontSize(12)
        .text(
          `${part.partName} | Stock: ${part.stock} | Price: Rs.${part.price}`
        );
    });

    doc.moveDown();

    // Orders
    doc.fontSize(16).text("Orders");

    orders.forEach((order) => {
      doc
        .fontSize(12)
        .text(
          `${order.customerName} | ${order.partName} | Qty: ${order.quantity} | Status: ${order.status}`
        );
    });

    doc.end();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;