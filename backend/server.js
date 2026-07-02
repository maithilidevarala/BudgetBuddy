const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// =======================
// Middleware
// =======================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================
// Test Route
// =======================

app.get("/", (req, res) => {
    res.send("🚀 BudgetBuddy Backend Running Successfully...");
});

// =======================
// API Routes
// =======================

// Authentication
app.use("/api/auth", require("./routes/authRoutes"));

// Income
app.use("/api/income", require("./routes/incomeRoutes"));

// Expense
app.use("/api/expense", require("./routes/expenseRoutes"));

// Budget
app.use("/api/budget", require("./routes/budgetRoutes"));

// Savings
app.use("/api/savings", require("./routes/savingsRoutes"));

// =======================
// MongoDB Connection
// =======================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
    })
    .catch((err) => {
        console.log("❌ MongoDB Connection Error");
        console.log(err);
    });

// =======================
// Server
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});