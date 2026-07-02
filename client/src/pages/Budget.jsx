import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Budget.css";

function Budget() {

    const [amount, setAmount] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const [budgets, setBudgets] = useState([]);

    const fetchBudgets = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/budget");
            setBudgets(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const handleSave = async () => {

        if (!amount || !month || !year) {
            alert("Please fill all fields");
            return;
        }

        try {

            await axios.post("http://localhost:5000/api/budget", {

                amount: Number(amount),
                month,
                year: Number(year)

            });

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

    return (

        <div className="budget-container">

            <h2>Budget Planner</h2>

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
                Save Budget
            </button>

            <table>

                <thead>

                    <tr>

                        <th>Amount</th>
                        <th>Month</th>
                        <th>Year</th>

                    </tr>

                </thead>

                <tbody>

                    {budgets.map((budget) => (

                        <tr key={budget._id}>

                            <td>₹{budget.amount}</td>
                            <td>{budget.month}</td>
                            <td>{budget.year}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Budget;