import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Income.css";

function Income() {

  const [amount, setAmount] = useState("");
  const [incomes, setIncomes] = useState([]);

  // Load Income
  const fetchIncome = async () => {

    try {

      const res = await axios.get("http://localhost:5000/api/income");

      setIncomes(res.data);

    } catch (error) {

      console.error("Error fetching income:", error);

    }

  };

  useEffect(() => {

    fetchIncome();

  }, []);

  // Save Income

  const handleSave = async () => {

    if (amount === "") {

      alert("Please enter an amount");

      return;

    }

    try {

      await axios.post(
        "http://localhost:5000/api/income",
        {
          amount: Number(amount),
        }
      );

      alert("Income Saved Successfully");

      setAmount("");

      fetchIncome();

    } catch (error) {

      console.error(error);

      alert("Failed to save income");

    }

  };

  // Total Income

  const totalIncome = incomes.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  return (

    <div className="income-page">

      <div className="income-header">

        <h1>💰 Income Management</h1>

        <p>
          Manage and track all your income in one place.
        </p>

      </div>

      <div className="income-summary">

        <div className="summary-card">

          <h3>Total Income</h3>

          <h2>₹ {totalIncome}</h2>

        </div>

      </div>

      <div className="income-form-card">

        <h2>Add New Income</h2>

        <div className="input-group">

          <input
            type="number"
            placeholder="Enter Income Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

          <button onClick={handleSave}>
            + Save Income
          </button>

        </div>

      </div>

      <div className="income-table-card">

        <h2>Income History</h2>

        {incomes.length === 0 ? (

          <div className="empty-box">

            <h3>No Income Found</h3>

            <p>
              Start by adding your first income.
            </p>

          </div>

        ) : (

          <table>

            <thead>

              <tr>

                <th>#</th>

                <th>Amount</th>

                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {incomes.map((item, index) => (

                <tr key={item._id}>

                  <td>{index + 1}</td>

                  <td className="income-amount">
                    ₹ {item.amount}
                  </td>

                  <td>
                    {new Date(
                      item.date
                    ).toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

}

export default Income;