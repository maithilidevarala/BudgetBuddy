import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password }
            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            alert(response.data.message);

            navigate("/dashboard");

        } catch (error) {
            alert(error.response?.data?.message || "Login Failed");
        }
    };

    return (

        <div className="login-container">

            {/* animated background */}
            <div className="blob b1"></div>
            <div className="blob b2"></div>
            <div className="blob b3"></div>

            <div className="login-card">

                {/* LEFT */}
                <div className="left-panel">

                    <div className="logo">💰 BudgetBuddy</div>

                    <h1>Welcome Back</h1>

                    <p>
                        Track your money smarter, faster and easier.
                        Your financial dashboard is waiting.
                    </p>

                    <ul>
                        <li>📊 Smart Analytics</li>
                        <li>💸 Expense Tracking</li>
                        <li>💰 Income Insights</li>
                        <li>🎯 Budget Control</li>
                    </ul>

                </div>

                {/* RIGHT */}
                <div className="right-panel">

                    <form onSubmit={handleLogin}>

                        <h2>Login</h2>

                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit">Login</button>

                        <p className="switch">
                            Don’t have an account?
                            <Link to="/register"> Register</Link>
                        </p>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default Login;