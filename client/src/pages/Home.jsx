import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">

        <h1>💰 BudgetBuddy</h1>

        <h3>Smart Personal Finance Manager</h3>

        <p>Welcome to BudgetBuddy</p>

        <p>Manage your Income, Expenses and Budgets easily.</p>

        <div className="home-buttons">
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="register-btn"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>

      </div>
    </div>
  );
}

export default Home;