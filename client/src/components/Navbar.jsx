import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  return (

    <nav className="navbar">

      <div className="logo">
        💰 BudgetBuddy
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link to="/expense">Expenses</Link>
        </li>

        <li>
          <Link to="/income">Income</Link>
        </li>

        <li>
          <Link to="/savings">Savings</Link>
        </li>

        <li>
          <Link to="/budget">Budget</Link>
        </li>

        

        <li>
          <Link to="/reports">Reports</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/register">Register</Link>
        </li>

      </ul>

    </nav>

  );

}

export default Navbar;