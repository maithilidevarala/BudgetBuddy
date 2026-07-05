import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Reports.css";

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

  const totalIncome = income.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalExpense = expense.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const balance = totalIncome - totalExpense;

  return (

    <div className="reports-page">

      {/* Header */}

      <div className="reports-header">

        <h1>📊 Financial Reports</h1>

        <p>

          Analyze your complete financial performance with detailed reports.

        </p>

      </div>

      {/* Summary Cards */}

      <div className="report-cards">

        <div className="report-card income-card">

          <h3>Total Income</h3>

          <h2>₹ {totalIncome}</h2>

          <p>Money Received</p>

        </div>

        <div className="report-card expense-card">

          <h3>Total Expense</h3>

          <h2>₹ {totalExpense}</h2>

          <p>Money Spent</p>

        </div>

        <div className="report-card balance-card">

          <h3>Current Balance</h3>

          <h2>₹ {balance}</h2>

          <p>Available Amount</p>

        </div>

      </div>

      {/* Income Table */}

      <div className="report-table-card">

        <h2>💰 Income History</h2>

        {

          income.length === 0 ?

          (

            <div className="empty-box">

              <h3>No Income Records</h3>

              <p>

                Income data will appear here.

              </p>

            </div>

          )

          :

          (

            <table>

              <thead>

                <tr>

                  <th>#</th>

                  <th>Amount</th>

                  <th>Date</th>

                </tr>

              </thead>

              <tbody>

                {

                  income.map((item, index) => (

                    <tr key={item._id || index}>

                      <td>{index + 1}</td>

                      <td className="income-text">

                        ₹ {item.amount}

                      </td>

                      <td>

                        {new Date(item.date).toLocaleDateString()}

                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

          )

        }

      </div>
            {/* Expense Table */}

      <div className="report-table-card">

        <h2>💸 Expense History</h2>

        {

          expense.length === 0 ?

          (

            <div className="empty-box">

              <h3>No Expense Records</h3>

              <p>

                Expense data will appear here.

              </p>

            </div>

          )

          :

          (

            <table>

              <thead>

                <tr>

                  <th>#</th>

                  <th>Amount</th>

                  <th>Date</th>

                </tr>

              </thead>

              <tbody>

                {

                  expense.map((item, index) => (

                    <tr key={item._id || index}>

                      <td>

                        {index + 1}

                      </td>

                      <td className="expense-text">

                        ₹ {item.amount}

                      </td>

                      <td>

                        {

                          new Date(
                            item.date
                          ).toLocaleDateString()

                        }

                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

          )

        }

      </div>

      {/* Financial Insights */}

      <div className="insights-card">

        <h2>📈 Financial Insights</h2>

        <div className="insight-grid">

          <div className="insight-item">

            <h3>Income</h3>

            <h1 className="green">

              ₹ {totalIncome}

            </h1>

            <p>

              Total money received.

            </p>

          </div>

          <div className="insight-item">

            <h3>Expense</h3>

            <h1 className="red">

              ₹ {totalExpense}

            </h1>

            <p>

              Total money spent.

            </p>

          </div>

          <div className="insight-item">

            <h3>Balance</h3>

            <h1
              className={
                balance >= 0
                  ? "blue"
                  : "red"
              }
            >

              ₹ {balance}

            </h1>

            <p>

              {

                balance >= 0

                ?

                "Great! You're saving money."

                :

                "Expenses are greater than income."

              }

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Reports;