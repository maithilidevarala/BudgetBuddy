const express = require("express");
const router = express.Router();

const Income = require("../models/Income");

// POST - Save Income
router.post("/", async (req, res) => {
  try {
    console.log("POST HIT");
    console.log(req.body);

    const income = new Income({
      amount: req.body.amount
    });

    await income.save();

    res.status(201).json(income);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// GET - Get All Income
router.get("/", async (req, res) => {
  try {
    const incomes = await Income.find();
    res.json(incomes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
