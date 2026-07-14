const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // =========================
    // COMMON USER DETAILS
    // =========================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "customer",
        "vendor",
        "admin",
      ],
      default: "customer",
    },

    // =========================
    // USER ACCOUNT STATUS
    // =========================

    status: {
      type: String,
      enum: [
        "Active",
        "Suspended",
      ],
      default: "Active",
    },

    // =========================
    // VENDOR APPROVAL STATUS
    // =========================

    approvalStatus: {
      type: String,
      enum: [
        "pending",
        "approved",
        "rejected",
      ],
      default: "approved",
    },

    // =========================
    // VENDOR DETAILS
    // =========================

    businessName: {
      type: String,
      default: "",
    },

    registrationNo: {
      type: String,
      default: "",
    },

    businessAddress: {
      type: String,
      default: "",
    },

    outletLocation: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    nic: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    // =========================
    // CUSTOMER PROFILE DETAILS
    // =========================

    address: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  UserSchema
);