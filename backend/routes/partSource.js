const express = require("express");

const PartSource = require("../models/PartSource");

const router = express.Router();


// ==========================
// GET ALL PART SOURCES
// ==========================

router.get("/", async (req, res) => {
  try {

    const sources = await PartSource.find()
      .sort({ createdAt: -1 });

    res.json(sources);

  } catch (error) {

    console.error(
      "Error fetching part sources:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch part sources",
    });

  }
});


// ==========================
// ADD NEW PART SOURCE
// ==========================

router.post("/", async (req, res) => {
  try {

    const {
      partName,
      supplierName,
      location,
      contact,
      purchasePrice,
      availability,
    } = req.body;


    const newSource =
      new PartSource({
        partName,
        supplierName,
        location,
        contact,
        purchasePrice,
        availability,
      });


    const savedSource =
      await newSource.save();


    res.status(201).json({
      message:
        "Part source added successfully",
      source: savedSource,
    });

  } catch (error) {

    console.error(
      "Error adding part source:",
      error
    );

    res.status(500).json({
      message:
        "Failed to add part source",
    });

  }
});


// ==========================
// UPDATE PART SOURCE
// ==========================

router.put("/:id", async (req, res) => {
  try {

    const updatedSource =
      await PartSource.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );


    if (!updatedSource) {

      return res.status(404).json({
        message:
          "Part source not found",
      });

    }


    res.json({
      message:
        "Part source updated successfully",
      source: updatedSource,
    });

  } catch (error) {

    console.error(
      "Error updating part source:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update part source",
    });

  }
});


// ==========================
// DELETE PART SOURCE
// ==========================

router.delete("/:id", async (req, res) => {
  try {

    const deletedSource =
      await PartSource.findByIdAndDelete(
        req.params.id
      );


    if (!deletedSource) {

      return res.status(404).json({
        message:
          "Part source not found",
      });

    }


    res.json({
      message:
        "Part source deleted successfully",
    });

  } catch (error) {

    console.error(
      "Error deleting part source:",
      error
    );

    res.status(500).json({
      message:
        "Failed to delete part source",
    });

  }
});


module.exports = router;