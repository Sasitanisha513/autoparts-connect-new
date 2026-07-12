const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");

// ==========================
// ADD VEHICLE
// ==========================
router.post("/add", async (req, res) => {
  try {
    const {
      sku,
      brand,
      model,
      year,
      fuel,
    } = req.body;

    // Check whether the SKU already exists
    const existingVehicle =
      await Vehicle.findOne({ sku });

    if (existingVehicle) {
      return res.status(400).json({
        message:
          "A vehicle with this SKU already exists.",
      });
    }

    const newVehicle = new Vehicle({
      sku,
      brand,
      model,
      year,
      fuel,
    });

    await newVehicle.save();

    res.status(201).json({
      message:
        "Vehicle added successfully.",
      vehicle: newVehicle,
    });

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to add vehicle.",
      error: error.message,
    });
  }
});


// ==========================
// GET ALL VEHICLES
// ==========================
router.get("/", async (req, res) => {
  try {
    const vehicles =
      await Vehicle.find().sort({
        createdAt: -1,
      });

    res.status(200).json(
      vehicles
    );

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to load vehicles.",
      error: error.message,
    });
  }
});


// ==========================
// GET ONE VEHICLE
// ==========================
router.get("/:id", async (req, res) => {
  try {
    const vehicle =
      await Vehicle.findById(
        req.params.id
      );

    if (!vehicle) {
      return res.status(404).json({
        message:
          "Vehicle not found.",
      });
    }

    res.status(200).json(
      vehicle
    );

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to load vehicle.",
      error: error.message,
    });
  }
});


// ==========================
// UPDATE VEHICLE
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const {
      sku,
      brand,
      model,
      year,
      fuel,
    } = req.body;

    // Check whether another vehicle
    // already uses the same SKU
    const duplicateVehicle =
      await Vehicle.findOne({
        sku,
        _id: {
          $ne: req.params.id,
        },
      });

    if (duplicateVehicle) {
      return res.status(400).json({
        message:
          "Another vehicle already uses this SKU.",
      });
    }

    const updatedVehicle =
      await Vehicle.findByIdAndUpdate(
        req.params.id,
        {
          sku,
          brand,
          model,
          year,
          fuel,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedVehicle) {
      return res.status(404).json({
        message:
          "Vehicle not found.",
      });
    }

    res.status(200).json({
      message:
        "Vehicle updated successfully.",
      vehicle: updatedVehicle,
    });

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to update vehicle.",
      error: error.message,
    });
  }
});


// ==========================
// DELETE VEHICLE
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    const deletedVehicle =
      await Vehicle.findByIdAndDelete(
        req.params.id
      );

    if (!deletedVehicle) {
      return res.status(404).json({
        message:
          "Vehicle not found.",
      });
    }

    res.status(200).json({
      message:
        "Vehicle deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message:
        "Failed to delete vehicle.",
      error: error.message,
    });
  }
});

module.exports = router;