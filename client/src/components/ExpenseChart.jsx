import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ExpenseChart() {
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const incomeRes = await api.get("/income");
    const expenseRes = await api.get("/expense");

    setIncome(incomeRes.data);
    setExpense(expenseRes.data);
  };

  const incomeTotal = income.reduce((a, b) => a + b.amount, 0);
  const expenseTotal = expense.reduce((a, b) => a + b.amount, 0);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Money Overview",
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["green", "red"]
      }
    ]
  };

  return (
    <div style={{ width: "500px", margin: "auto" }}>
      <h3>Income vs Expense</h3>
      <Bar data={data} />
    </div>
  );
}

export default ExpenseChart;