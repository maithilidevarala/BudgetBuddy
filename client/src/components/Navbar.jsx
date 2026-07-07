import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { isLoggedIn, logout } from "../utils/auth";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const loggedIn = isLoggedIn();

  const [showProfile, setShowProfile] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (

    <nav className="navbar">

      {/* Logo */}

      <div className="logo-area">

        <div className="logo-icon">

          💰

        </div>

        <div>

          <h2>BudgetBuddy</h2>

          <p>Smart Finance Manager</p>

        </div>

      </div>

      {/* Navigation */}

      <ul className="nav-links">

        <li>

          <Link to="/">🏠 Home</Link>

        </li>

        {

          !loggedIn ?

          (

            <>

              <li>

                <Link to="/login">

                  Login

                </Link>

              </li>

              <li>

                <Link to="/register">

                  Register

                </Link>

              </li>

            </>

          )

          :

          (

            <>

              <li>

                <Link to="/dashboard">

                  📊 Dashboard

                </Link>

              </li>

              <li>

                <Link to="/income">

                  💰 Income

                </Link>

              </li>

              <li>

                <Link to="/expense">

                  💸 Expense

                </Link>

              </li>

              <li>

                <Link to="/budget">

                  🎯 Budget

                </Link>

              </li>

              <li>

                <Link to="/savings">

                  💎 Savings

                </Link>

              </li>

              <li>

                <Link to="/reports">

                  📈 Reports

                </Link>

              </li>

            </>

          )

        }

      </ul>

      {/* Right Section */}

      {

        loggedIn &&

        <div className="right-section">

          <div className="notification">

            🔔

            <span className="notify-dot">

            </span>

          </div>

          <div

            className="profile"

            onClick={() =>

              setShowProfile(!showProfile)

            }

          >

            <div className="avatar">

              {

                user?.name

                ?

                user.name.charAt(0).toUpperCase()

                :

                "U"

              }

            </div>

            <div className="profile-info">

              <h4>

                {user?.name || "User"}

              </h4>

              <p>

                Software Developer

              </p>

            </div>

            <span>

              ▼

            </span>

            {

              showProfile &&

              <div className="profile-dropdown">

                <p>

                  👤 My Profile

                </p>

                <p>

                  📊 Dashboard

                </p>

                <p>

                  ⚙ Settings

                </p>

                <hr />

                <button

                  className="logout-btn"

                  onClick={handleLogout}

                >

                  🚪 Logout

                </button>

              </div>

            }

          </div>

        </div>

      }

    </nav>

  );

}

export default Navbar;