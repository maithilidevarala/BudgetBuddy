import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Expense.css";

function Expense() {

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expense");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSave = async () => {

    if (!amount || !category) {
      alert("Fill all required fields");
      return;
    }

    await axios.post("http://localhost:5000/api/expense", {

      amount: Number(amount),
      category,
      description

    });

    alert("Expense Saved");

    setAmount("");
    setCategory("");
    setDescription("");

    fetchExpenses();

  };

  return (

    <div className="expense-container">

      <h2>Expense</h2>

      <input
        type="number"
        placeholder="Amount"
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

      <button onClick={handleSave}>Save Expense</button>

      <table>

        <thead>

          <tr>

            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>

          </tr>

        </thead>

        <tbody>

          {expenses.map((item) => (

            <tr key={item._id}>

              <td>₹{item.amount}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Expense;