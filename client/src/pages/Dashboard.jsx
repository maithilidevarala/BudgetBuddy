import { useEffect, useState } from "react";
import api from "../services/api";
import ExpenseChart from "../components/ExpenseChart";

function Dashboard() {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const incomeRes = await api.get("/income");
      const expenseRes = await api.get("/expense");

      setIncome(incomeRes.data);
      setExpense(expenseRes.data);
    } catch (err) {
      console.log("Dashboard Error:", err);
    }
  };

  // Calculations
  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expense.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Dashboard</h2>

      {/* SUMMARY CARDS */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>

        {/* INCOME CARD */}
        <div style={{
          padding: "20px",
          backgroundColor: "#e8f5e9",
          borderRadius: "10px",
          width: "200px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
        }}>
          <h3>Income</h3>
          <h2 style={{ color: "green" }}>₹ {totalIncome}</h2>
        </div>

        {/* EXPENSE CARD */}
        <div style={{
          padding: "20px",
          backgroundColor: "#ffebee",
          borderRadius: "10px",
          width: "200px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
        }}>
          <h3>Expense</h3>
          <h2 style={{ color: "red" }}>₹ {totalExpense}</h2>
        </div>

        {/* BALANCE CARD */}
        <div style={{
          padding: "20px",
          backgroundColor: "#e3f2fd",
          borderRadius: "10px",
          width: "200px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
        }}>
          <h3>Balance</h3>
          <h2 style={{ color: "blue" }}>₹ {balance}</h2>
        </div>

      </div>

      {/* CHART SECTION */}
      <div style={{ marginTop: "40px" }}>
        <ExpenseChart />
      </div>

      {/* QUICK SUMMARY */}
      <div style={{ marginTop: "30px" }}>
        <h3>📌 Quick Summary</h3>

        <p>✔ Total Income: ₹ {totalIncome}</p>
        <p>✔ Total Expense: ₹ {totalExpense}</p>
        <p>✔ Remaining Balance: ₹ {balance}</p>

        {balance >= 0 ? (
          <p style={{ color: "green" }}>✔ You are saving money</p>
        ) : (
          <p style={{ color: "red" }}>⚠ You are in loss</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;