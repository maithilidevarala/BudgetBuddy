import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* Background Effects */}
      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>
      <div className="bg-circle circle3"></div>

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-left">

          <span className="badge">
            💡 Smart Money Management
          </span>

          <h1>💰 BudgetBuddy</h1>

          <h2>Smart Personal Finance Manager</h2>

          <p>
            Manage your Income, Expenses, Budgets,
            Savings and Reports from one secure platform.
            Stay in control of your financial future.
          </p>

          <div className="hero-buttons">

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

        <div className="hero-right">

          <div className="finance-card">

            <h3>📊 Monthly Overview</h3>

            <div className="finance-item">
              <span>Income</span>
              <span className="green">₹45,000</span>
            </div>

            <div className="finance-item">
              <span>Expense</span>
              <span className="red">₹20,000</span>
            </div>

            <div className="finance-item">
              <span>Savings</span>
              <span className="blue">₹25,000</span>
            </div>

            <hr />

            <div className="finance-item">
              <span>Budget Left</span>
              <span className="orange">₹15,000</span>
            </div>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="features">

        <h2>Why Choose BudgetBuddy?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="icon">💰</div>
            <h3>Income Tracking</h3>
            <p>Manage all your income sources in one place.</p>
          </div>

          <div className="feature-card">
            <div className="icon">💸</div>
            <h3>Expense Control</h3>
            <p>Track daily expenses and avoid overspending.</p>
          </div>

          <div className="feature-card">
            <div className="icon">📊</div>
            <h3>Analytics</h3>
            <p>Beautiful reports to understand your finances.</p>
          </div>

          <div className="feature-card">
            <div className="icon">🎯</div>
            <h3>Savings Goals</h3>
            <p>Stay motivated and achieve your financial goals.</p>
          </div>

        </div>

      </section>

      {/* Footer */}

      <footer>

        <h3>💰 BudgetBuddy</h3>

        <p>Smart Personal Finance Management System</p>

        <p>© 2026 BudgetBuddy | All Rights Reserved.</p>

      </footer>

    </div>
  );
}

export default Home;