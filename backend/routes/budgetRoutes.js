const express = require("express");
const router = express.Router();

const Budget = require("../models/Budget");

// Save Budget
router.post("/", async (req, res) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();

    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// Get All Budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = router;