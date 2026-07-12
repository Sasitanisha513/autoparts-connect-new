const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["customer", "vendor", "admin"],
    default: "customer",
  },

  approvalStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "approved",
  },

  // Vendor Details

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
  // Customer Address

address: {
  type: String,
  default: "",
},


// Profile Image

profileImage: {
  type: String,
  default: "",
},


// Vendor Business Description

description: {
  type: String,
  default: "",
},

// Customer Details

address: {
  type: String,
  default: "",
},

profileImage: {
  type: String,
  default: "",
},

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "User",
  UserSchema
);