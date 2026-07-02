const express = require("express");
const router = express.Router();

const Savings = require("../models/Savings");

// Add Savings
router.post("/", async (req, res) => {
  try {
    const saving = new Savings(req.body);
    await saving.save();
    res.status(201).json(saving);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Savings
router.get("/", async (req, res) => {
  try {
    const savings = await Savings.find();
    res.json(savings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;