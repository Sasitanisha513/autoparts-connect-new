const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");
const upload = require("../middleware/multer");
const fs = require("fs");
const path = require("path");

// ==========================
// ADD VEHICLE
// ==========================
router.post(
  "/add",
  upload.single("image"),
  async (req, res) => {  try {
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
  image: req.file
    ? `uploads/vehicles/${req.file.filename}`
    : "",
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

router.put(
  "/:id",
  upload.single("image"),
  async (req, res) => {
    try {

      const { sku, brand, model, year, fuel } = req.body;

      const duplicateVehicle = await Vehicle.findOne({
        sku,
        _id: { $ne: req.params.id },
      });

      if (duplicateVehicle) {
        return res.status(400).json({
          message: "Another vehicle already uses this SKU.",
        });
      }

      const vehicle = await Vehicle.findById(req.params.id);

      if (!vehicle) {
        return res.status(404).json({
          message: "Vehicle not found.",
        });
      }

      if (req.file) {

        if (vehicle.image) {
          const oldImage = path.join(__dirname, "..", vehicle.image);

          if (fs.existsSync(oldImage)) {
            fs.unlinkSync(oldImage);
          }
        }

        vehicle.image = `uploads/vehicles/${req.file.filename}`;
      }

      vehicle.sku = sku;
      vehicle.brand = brand;
      vehicle.model = model;
      vehicle.year = year;
      vehicle.fuel = fuel;

      await vehicle.save();

      res.status(200).json({
        message: "Vehicle updated successfully.",
        vehicle,
      });

    } catch (error) {
      res.status(500).json({
        message: "Failed to update vehicle.",
        error: error.message,
      });
    }
  }
);


// ==========================
// DELETE VEHICLE
// ==========================

router.delete("/:id", async (req, res) => {
  try {

    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found.",
      });
    }

    // Delete image from uploads folder
    if (vehicle.image) {

      const imagePath = path.join(
        __dirname,
        "..",
        vehicle.image
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

    }

    await Vehicle.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Vehicle deleted successfully.",
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to delete vehicle.",
      error: error.message,
    });

  }
});

module.exports = router;