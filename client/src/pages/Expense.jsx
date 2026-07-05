import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Expense.css";

function Expense() {

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);

  // Fetch Expenses
  const fetchExpenses = async () => {

    try {

      const res = await axios.get("http://localhost:5000/api/expense");

      setExpenses(res.data);

    } catch (error) {

      console.error("Error Fetching Expenses", error);

    }

  };

  useEffect(() => {

    fetchExpenses();

  }, []);

  // Save Expense
  const handleSave = async () => {

    if (!amount || !category) {

      alert("Fill all required fields");

      return;

    }

    try {

      await axios.post(
        "http://localhost:5000/api/expense",
        {

          amount: Number(amount),
          category,
          description

        }
      );

      alert("Expense Saved Successfully");

      setAmount("");
      setCategory("");
      setDescription("");

      fetchExpenses();

    } catch (error) {

      console.log(error);

      alert("Failed to Save Expense");

    }

  };

  // Total Expense
  const totalExpense = expenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (

    <div className="expense-page">

      {/* Header */}

      <div className="expense-header">

        <h1>💸 Expense Management</h1>

        <p>
          Track your daily expenses and manage your spending efficiently.
        </p>

      </div>

      {/* Summary Card */}

      <div className="expense-summary">

        <div className="summary-card">

          <h3>Total Expense</h3>

          <h2>₹ {totalExpense}</h2>

        </div>

      </div>

      {/* Expense Form */}

      <div className="expense-form-card">

        <h2>Add New Expense</h2>

        <div className="form-grid">

          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={handleSave}>

            + Save Expense

          </button>

        </div>

      </div>

      {/* Expense Table */}

      <div className="expense-table-card">

        <h2>Expense History</h2>

        {

          expenses.length === 0 ?

          (

            <div className="empty-box">

              <h3>No Expense Found</h3>

              <p>
                Add your first expense to get started.
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

                  <th>Category</th>

                  <th>Description</th>

                  <th>Date</th>

                </tr>

              </thead>

              <tbody>

                {

                  expenses.map((item, index) => (

                    <tr key={item._id}>

                      <td>{index + 1}</td>

                      <td className="expense-amount">
                        ₹ {item.amount}
                      </td>

                      <td>

                        <span className="category-tag">

                          {item.category}

                        </span>

                      </td>

                      <td>{item.description}</td>

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

    </div>

  );

}

export default Expense;