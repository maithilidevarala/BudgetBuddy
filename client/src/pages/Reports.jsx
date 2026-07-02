import { useEffect, useState } from "react";
import api from "../services/api";

function Reports() {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const incomeRes = await api.get("/income");
      const expenseRes = await api.get("/expense");

      setIncome(incomeRes.data);
      setExpense(expenseRes.data);
    } catch (err) {
      console.log("Error fetching reports:", err);
    }
  };

  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expense.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📑 Reports Page</h2>

      {/* SUMMARY */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div>
          <h3>Total Income</h3>
          <p style={{ color: "green" }}>{totalIncome}</p>
        </div>

        <div>
          <h3>Total Expense</h3>
          <p style={{ color: "red" }}>{totalExpense}</p>
        </div>

        <div>
          <h3>Balance</h3>
          <p style={{ color: "blue" }}>{totalIncome - totalExpense}</p>
        </div>
      </div>

      {/* INCOME TABLE */}
      <h3>Income Details</h3>
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {income.map((item, index) => (
            <tr key={index}>
              <td style={{ color: "green" }}>{item.amount}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      {/* EXPENSE TABLE */}
      <h3>Expense Details</h3>
      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expense.map((item, index) => (
            <tr key={index}>
              <td style={{ color: "red" }}>{item.amount}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;