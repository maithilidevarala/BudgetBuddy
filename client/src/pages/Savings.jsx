import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Savings.css";

function Savings() {

  const [amount, setAmount] = useState("");
  const [goal, setGoal] = useState("");
  const [description, setDescription] = useState("");
  const [savings, setSavings] = useState([]);

  // Fetch Savings

  const fetchSavings = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/savings"
      );

      setSavings(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchSavings();

  }, []);

  // Save Savings

  const handleSave = async () => {

    if (!amount || !goal) {

      alert("Please fill all required fields");

      return;

    }

    try {

      await axios.post(
        "http://localhost:5000/api/savings",
        {

          amount: Number(amount),
          goal,
          description,

        }
      );

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

  // Total Savings

  const totalSavings = savings.reduce(

    (sum, item) => sum + item.amount,

    0

  );

  return (

    <div className="savings-page">

      {/* Header */}

      <div className="savings-header">

        <h1>💎 Savings Planner</h1>

        <p>

          Build your savings goals and achieve financial freedom.

        </p>

      </div>

      {/* Summary */}

      <div className="savings-summary">

        <div className="summary-card">

          <h3>Total Savings</h3>

          <h2>₹ {totalSavings}</h2>

        </div>

      </div>

      {/* Form */}

      <div className="savings-form-card">

        <h2>Add Savings</h2>

        <div className="form-grid">

          <input

            type="number"

            placeholder="Savings Amount"

            value={amount}

            onChange={(e) => setAmount(e.target.value)}

          />

          <input

            type="text"

            placeholder="Savings Goal"

            value={goal}

            onChange={(e) => setGoal(e.target.value)}

          />

          <input

            type="text"

            placeholder="Description"

            value={description}

            onChange={(e) => setDescription(e.target.value)}

          />

          <button onClick={handleSave}>

            + Add Savings

          </button>

        </div>

      </div>

      {/* Savings Table */}

      <div className="savings-table-card">

        <h2>Savings History</h2>

        {

          savings.length === 0 ?

          (

            <div className="empty-box">

              <h3>No Savings Found</h3>

              <p>

                Start saving today by adding your first savings record.

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

                  <th>Goal</th>

                  <th>Description</th>

                  <th>Date</th>

                </tr>

              </thead>

              <tbody>

                {

                  savings.map((item, index) => (

                    <tr key={item._id}>

                      <td>

                        {index + 1}

                      </td>

                      <td className="saving-amount">

                        ₹ {item.amount}

                      </td>

                      <td>

                        <span className="goal-tag">

                          {item.goal}

                        </span>

                      </td>

                      <td>

                        {item.description}

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

    </div>

  );

}

export default Savings;