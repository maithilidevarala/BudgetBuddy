const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Budget", BudgetSchema);