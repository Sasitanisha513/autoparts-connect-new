const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(

  {

    // CUSTOMER ID
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // CUSTOMER DETAILS

    customerName: {
      type: String,
      required: true,
    },

    customerEmail: {
      type: String,
      required: true,
    },

    customerPhone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    // ORDERED PRODUCTS

    items: [
      {
        partName: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    // PAYMENT DETAILS

    paymentMethod: {
      type: String,
      enum: [
        "pickup",
        "cod",
        "payhere",
      ],
      required: true,
    },

    // ORDER PRICE

    shippingFee: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    // OPTIONAL ORDER NOTE

    notes: {
      type: String,
      default: "",
    },

    // ORDER STATUS

    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Ready for Pickup",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

  },

  {
    timestamps: true,
  }

);

module.exports = mongoose.model(
  "Order",
  OrderSchema
);