import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                { name, email, password }
            );

            alert(res.data.message);
            navigate("/login");

        } catch (err) {
            alert(err.response?.data?.message || "Registration Failed");
        }
    };

    return (

        <div className="register-container">

            {/* glowing background */}
            <div className="blob r1"></div>
            <div className="blob r2"></div>
            <div className="blob r3"></div>

            <div className="register-card">

                {/* LEFT PANEL */}
                <div className="left-panel">

                    <div className="logo">💰 BudgetBuddy</div>

                    <h1>Create Account</h1>

                    <p>
                        Join BudgetBuddy and take control of your financial future.
                        Track income, expenses, savings & reports easily.
                    </p>

                    <ul>
                        <li>📊 Smart Dashboard</li>
                        <li>💸 Expense Tracking</li>
                        <li>💰 Income Management</li>
                        <li>🎯 Savings Goals</li>
                    </ul>

                </div>

                {/* RIGHT PANEL */}
                <div className="right-panel">

                    <form onSubmit={handleRegister}>

                        <h2>Register</h2>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit">
                            Create Account
                        </button>

                        <p className="switch">
                            Already have an account?
                            <Link to="/login"> Login</Link>
                        </p>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default Register;