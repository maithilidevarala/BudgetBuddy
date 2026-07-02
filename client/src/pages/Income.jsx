import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Income.css";

function Income() {
  const [amount, setAmount] = useState("");
  const [incomes, setIncomes] = useState([]);

  // Load all income data
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

  // Save income
  const handleSave = async () => {
    if (amount === "") {
      alert("Please enter an amount");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/income", {
        amount: Number(amount),
      });

      alert("Income Saved Successfully");

      setAmount("");

      fetchIncome();
    } catch (error) {
      console.error(error);
      alert("Failed to save income");
    }
  };

  return (
    <div className="income-container">
      <h2>Income</h2>

      <input
        type="number"
        placeholder="Enter Income"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleSave}>Save Income</button>

      <h3>Income List</h3>

      {incomes.length === 0 ? (
        <p>No income found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {incomes.map((item) => (
              <tr key={item._id}>
                <td>₹{item.amount}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Income;