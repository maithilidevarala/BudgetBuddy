const mongoose = require("mongoose");

const SavingsSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Savings", SavingsSchema);