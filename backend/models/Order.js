const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true
    },

    customerEmail: {
      type: String,
      required: true
    },

    partName: {
      type: String,
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    pickupLocation: {
      type: String,
      required: true
    },

    pickupDate: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Ready", "Completed"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", OrderSchema);