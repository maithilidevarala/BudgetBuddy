import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Charts({ income, expense, savings }) {

  const pieData = {

    labels: ["Income", "Expense", "Savings"],

    datasets: [

      {

        data: [income, expense, savings],

        backgroundColor: [

          "#16a34a",

          "#dc2626",

          "#2563eb",

        ],

      },

    ],

  };

  const barData = {

    labels: ["Income", "Expense", "Savings"],

    datasets: [

      {

        label: "Amount",

        data: [income, expense, savings],

        backgroundColor: [

          "#16a34a",

          "#dc2626",

          "#2563eb",

        ],

      },

    ],

  };

  return (

    <div>

      <h2>Financial Charts</h2>

      <div style={{ width: "400px", margin: "30px auto" }}>

        <Pie data={pieData} />

      </div>

      <div style={{ width: "600px", margin: "30px auto" }}>

        <Bar data={barData} />

      </div>

    </div>

  );

}

export default Charts;