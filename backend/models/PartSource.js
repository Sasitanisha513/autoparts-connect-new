const mongoose = require("mongoose");

const PartSourceSchema = new mongoose.Schema(
  {
    partName: {
      type: String,
      required: true,
      trim: true,
    },

    supplierName: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    contact: {
      type: String,
      trim: true,
    },

    purchasePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    availability: {
      type: String,
      enum: [
        "Available",
        "Limited",
        "Unavailable",
      ],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PartSource",
  PartSourceSchema
);