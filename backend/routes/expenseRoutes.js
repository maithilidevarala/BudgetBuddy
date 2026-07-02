const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense");

// Add Expense
router.post("/", async (req, res) => {
  try {
    const expense = new Expense(req.body);

    await expense.save();

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;