import { useEffect, useState } from "react";
import api from "../services/api";
import ExpenseChart from "../components/ExpenseChart";
import "../styles/Dashboard.css";

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

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expense.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpense;

  return (

    <div className="dashboard-page">

      <h2 className="dashboard-title">
        📊 Dashboard
      </h2>

      <div className="dashboard-cards">

        <div className="dashboard-card income-card">

          <h3>Total Income</h3>

          <h2>₹ {totalIncome}</h2>

        </div>

        <div className="dashboard-card expense-card">

          <h3>Total Expense</h3>

          <h2>₹ {totalExpense}</h2>

        </div>

        <div className="dashboard-card balance-card">

          <h3>Current Balance</h3>

          <h2>₹ {balance}</h2>

        </div>

      </div>

      <div className="chart-section">

        <ExpenseChart />

      </div>

      <div className="summary-box">

        <h3>📌 Quick Summary</h3>

        <p>✔ Total Income : ₹ {totalIncome}</p>

        <p>✔ Total Expense : ₹ {totalExpense}</p>

        <p>✔ Remaining Balance : ₹ {balance}</p>

        {balance >= 0 ? (

          <p className="profit">

            ✔ Great! You're saving money every month.

          </p>

        ) : (

          <p className="loss">

            ⚠ Your expenses are higher than your income.

          </p>

        )}

      </div>

    </div>

  );

}

export default Dashboard;