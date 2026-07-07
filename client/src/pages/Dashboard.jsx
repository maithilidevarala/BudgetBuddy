import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ExpenseChart from "../components/ExpenseChart";
import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

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

  const totalIncome = income.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalExpense = expense.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const balance = totalIncome - totalExpense;

  const latestIncome =
    income.length > 0
      ? income[income.length - 1]
      : null;

  const latestExpense =
    expense.length > 0
      ? expense[expense.length - 1]
      : null;

  return (

    <div className="dashboard-page">

      {/* Welcome Section */}

      <div className="welcome-card">

        <div>

          <h1>

            Welcome back,

            <span>

              {" "}
              {user?.name || "User"}

            </span>

            👋

          </h1>

          <p>

            Here's an overview of your financial activity.

          </p>

        </div>

        <div className="welcome-icon">

          💰

        </div>

      </div>

      {/* Summary Cards */}

      <div className="dashboard-cards">

        <div className="dashboard-card income-card">

          <div className="card-icon">

            💵

          </div>

          <h3>Total Income</h3>

          <h2>

            ₹ {totalIncome}

          </h2>

          <p>

            Total earnings

          </p>

        </div>

        <div className="dashboard-card expense-card">

          <div className="card-icon">

            💸

          </div>

          <h3>Total Expense</h3>

          <h2>

            ₹ {totalExpense}

          </h2>

          <p>

            Total spending

          </p>

        </div>

        <div className="dashboard-card balance-card">

          <div className="card-icon">

            🏦

          </div>

          <h3>Current Balance</h3>

          <h2>

            ₹ {balance}

          </h2>

          <p>

            Available balance

          </p>

        </div>

        <div className="dashboard-card savings-card">

          <div className="card-icon">

            💎

          </div>

          <h3>Savings Rate</h3>

          <h2>

            {

              totalIncome > 0

                ? Math.round(
                    (balance / totalIncome) * 100
                  )

                : 0

            }%

          </h2>

          <p>

            Monthly savings

          </p>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="quick-actions">

        <h2>

          ⚡ Quick Actions

        </h2>

        <div className="action-buttons">

          <button
            onClick={() => navigate("/income")}
          >

            💰 Add Income

          </button>

          <button
            onClick={() => navigate("/expense")}
          >

            💸 Add Expense

          </button>

          <button
            onClick={() => navigate("/budget")}
          >

            🎯 Budget

          </button>

          <button
            onClick={() => navigate("/savings")}
          >

            💎 Savings

          </button>

        </div>

      </div>

      {/* Expense Chart */}

      <div className="chart-card">

        <h2>

          📈 Expense Analytics

        </h2>

        <ExpenseChart />

      </div>
            {/* Recent Activity */}

      <div className="activity-grid">

        {/* Recent Income */}

        <div className="activity-card">

          <h2>💰 Latest Income</h2>

          {

            latestIncome ?

            (

              <>

                <h3 className="income-text">

                  ₹ {latestIncome.amount}

                </h3>

                <p>

                  {

                    new Date(
                      latestIncome.date
                    ).toLocaleDateString()

                  }

                </p>

              </>

            )

            :

            (

              <p>

                No income records found.

              </p>

            )

          }

        </div>

        {/* Recent Expense */}

        <div className="activity-card">

          <h2>💸 Latest Expense</h2>

          {

            latestExpense ?

            (

              <>

                <h3 className="expense-text">

                  ₹ {latestExpense.amount}

                </h3>

                <p>

                  {

                    new Date(
                      latestExpense.date
                    ).toLocaleDateString()

                  }

                </p>

              </>

            )

            :

            (

              <p>

                No expense records found.

              </p>

            )

          }

        </div>

      </div>

      {/* Financial Summary */}

      <div className="summary-box">

        <h2>

          📌 Financial Summary

        </h2>

        <div className="summary-list">

          <div className="summary-item">

            <span>Total Income</span>

            <strong className="income-text">

              ₹ {totalIncome}

            </strong>

          </div>

          <div className="summary-item">

            <span>Total Expense</span>

            <strong className="expense-text">

              ₹ {totalExpense}

            </strong>

          </div>

          <div className="summary-item">

            <span>Current Balance</span>

            <strong className="balance-text">

              ₹ {balance}

            </strong>

          </div>

          <div className="summary-item">

            <span>Savings Percentage</span>

            <strong className="savings-text">

              {

                totalIncome > 0

                ?

                Math.round(
                  (balance / totalIncome) * 100
                )

                :

                0

              }%

            </strong>

          </div>

        </div>

        <div className="financial-message">

          {

            balance > 0 ?

            (

              <div className="success-box">

                ✅ Excellent! You are managing your finances well.
                Keep saving consistently to reach your financial goals.

              </div>

            )

            :

            (

              <div className="warning-box">

                ⚠ Your expenses are higher than your income.
                Consider reducing unnecessary spending.

              </div>

            )

          }

        </div>

      </div>

    </div>

  );

}

export default Dashboard;