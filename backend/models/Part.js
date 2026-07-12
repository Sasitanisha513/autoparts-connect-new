const mongoose = require("mongoose");

const PartSchema = new mongoose.Schema(
  {
    sku: {
  type: String,
  required: true,
  unique: true,
  trim: true
},
    partName: {
      type: String,
      required: true
    },
brand: {
  type: String,
  required: true,
  trim: true
},

    vehicle: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

   condition: {
  type: String,
  enum: [
    "New",
    "Used",
    "Refurbished"
  ],
  required: true,
},

    supplier: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    stock: {
      type: Number,
      required: true
    },

    availability: {
      type: Boolean,
      default: true
    },

    image: {
      type: String,
      default: ""
    },

    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Part", PartSchema);