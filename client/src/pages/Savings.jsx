import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Savings.css";

function Savings() {
  const [amount, setAmount] = useState("");
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const [savings, setSavings] = useState([]);

  const fetchSavings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/savings");
      setSavings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSavings();
  }, []);

  const handleSave = async () => {
    if (!amount || !goal) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/savings", {
        amount: Number(amount),
        goal,
        description,
      });

      alert("Savings Added Successfully");

      setAmount("");
      setGoal("");
      setDescription("");

      fetchSavings();
    } catch (err) {
      console.log(err);
      alert("Error Saving Savings");
    }
  };

  return (
    <div className="savings-container">
      <h2>Savings</h2>

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="text"
        placeholder="Goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={handleSave}>Add Savings</button>

      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Goal</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {savings.map((item) => (
            <tr key={item._id}>
              <td>₹{item.amount}</td>
              <td>{item.goal}</td>
              <td>{item.description}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Savings;