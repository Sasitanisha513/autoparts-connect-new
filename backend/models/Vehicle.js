const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    fuel: {
      type: String,
      required: true,
      enum: [
        "Petrol",
        "Diesel",
        "Hybrid",
        "Electric",
      ],
      default: "Petrol",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Vehicle",
  VehicleSchema
);