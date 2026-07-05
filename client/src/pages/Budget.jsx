import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Budget.css";

function Budget() {

  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [budgets, setBudgets] = useState([]);

  // Fetch Budgets

  const fetchBudgets = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/budget"
      );

      setBudgets(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchBudgets();

  }, []);

  // Save Budget

  const handleSave = async () => {

    if (!amount || !month || !year) {

      alert("Please fill all fields");

      return;

    }

    try {

      await axios.post(
        "http://localhost:5000/api/budget",
        {

          amount: Number(amount),
          month,
          year: Number(year)

        }
      );

      alert("Budget Saved Successfully");

      setAmount("");
      setMonth("");
      setYear("");

      fetchBudgets();

    } catch (err) {

      console.log(err);

      alert("Error Saving Budget");

    }

  };

  // Total Budget

  const totalBudget = budgets.reduce(

    (sum, item) => sum + item.amount,

    0

  );

  return (

    <div className="budget-page">

      {/* Header */}

      <div className="budget-header">

        <h1>💳 Budget Planner</h1>

        <p>

          Plan your monthly budget and stay financially organized.

        </p>

      </div>

      {/* Summary */}

      <div className="budget-summary">

        <div className="summary-card">

          <h3>Total Budget</h3>

          <h2>₹ {totalBudget}</h2>

        </div>

      </div>

      {/* Form */}

      <div className="budget-form-card">

        <h2>Create Budget</h2>

        <div className="form-grid">

          <input

            type="number"

            placeholder="Budget Amount"

            value={amount}

            onChange={(e) => setAmount(e.target.value)}

          />

          <input

            type="text"

            placeholder="Month"

            value={month}

            onChange={(e) => setMonth(e.target.value)}

          />

          <input

            type="number"

            placeholder="Year"

            value={year}

            onChange={(e) => setYear(e.target.value)}

          />

          <button onClick={handleSave}>

            + Save Budget

          </button>

        </div>

      </div>

      {/* Budget History */}

      <div className="budget-table-card">

        <h2>Budget History</h2>

        {

          budgets.length === 0 ?

          (

            <div className="empty-box">

              <h3>No Budget Found</h3>

              <p>

                Create your first budget plan.

              </p>

            </div>

          )

          :

          (

            <table>

              <thead>

                <tr>

                  <th>#</th>

                  <th>Budget</th>

                  <th>Month</th>

                  <th>Year</th>

                </tr>

              </thead>

              <tbody>

                {

                  budgets.map((budget, index) => (

                    <tr key={budget._id}>

                      <td>

                        {index + 1}

                      </td>

                      <td className="budget-amount">

                        ₹ {budget.amount}

                      </td>

                      <td>

                        <span className="month-tag">

                          {budget.month}

                        </span>

                      </td>

                      <td>

                        {budget.year}

                      </td>

                    </tr>

                  ))

                }

              </tbody>

            </table>

          )

        }

      </div>

    </div>

  );

}

export default Budget;