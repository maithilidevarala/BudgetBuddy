import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logout } from "../utils/auth";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">💰 BudgetBuddy</div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        {!loggedIn ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/income">Income</Link></li>
            <li><Link to="/expense">Expense</Link></li>
            <li><Link to="/budget">Budget</Link></li>
            <li><Link to="/savings">Savings</Link></li>
            <li><Link to="/reports">Reports</Link></li>

            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}

      </ul>
    </nav>
  );
}

export default Navbar;