import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import {
  FaPlus,
  FaSignInAlt,
  FaBoxOpen,
  FaMoon,
  FaSun,
  FaTshirt,
  FaLaptop,
  FaShoppingBag,
  FaAppleAlt,
  FaMagic,
  FaThLarge,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "../../assets/css/Navbar.module.css";

const categoryIcons = {
  fashion: <FaTshirt />,
  electronics: <FaLaptop />,
  bags: <FaShoppingBag />,
  groceries: <FaAppleAlt />,
  beauty: <FaMagic />,
};

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // New state for logout popup
  const navigate = useNavigate(); // Added navigate for redirect

  useEffect(() => {
    document.body.className = darkMode ? styles.darkTheme : styles.lightTheme;
    // Check token on mount and listen for login event
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkToken(); // Initial check
    window.addEventListener("storage", checkToken); // Listen for storage changes (other tabs)
    window.addEventListener("userLogin", checkToken); // Listen for custom login event

    // Reinitialize Bootstrap dropdowns when isLoggedIn or darkMode changes
    const bootstrap = window.bootstrap;
    if (bootstrap) {
      // Dispose existing dropdown instances
      document.querySelectorAll(".dropdown-toggle").forEach((element) => {
        const dropdown = bootstrap.Dropdown.getInstance(element);
        if (dropdown) {
          dropdown.dispose(); // Cleanup previous instance
        }
      });
      // Reinitialize dropdowns
      const dropdownElements = document.querySelectorAll(".dropdown-toggle");
      dropdownElements.forEach((element) => {
        new bootstrap.Dropdown(element); // Reinitialize dropdown
      });
    }

    return () => {
      window.removeEventListener("storage", checkToken);
      window.removeEventListener("userLogin", checkToken); // Cleanup
    };
  }, [darkMode, isLoggedIn]); // Added isLoggedIn to dependencies

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData"); // Updated to match SignIn storage
    setIsLoggedIn(false); // Update login state
    setShowLogoutPopup(true); // Show logout popup
    setTimeout(() => {
      setShowLogoutPopup(false);
      navigate("/signin"); // Redirect after popup
    }, 2000);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg px-4 ${
        darkMode ? styles.navDark : styles.navLight
      }`}
    >
      <Link className={`navbar-brand ${styles.brand}`} to="/">
        Admin Dashboard
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center">
          <li className="nav-item mx-2">
            <Link className={`nav-link ${styles.navLink}`} to="/createProduct">
              <FaPlus className={styles.icon} /> Create Product
            </Link>
          </li>

          <li className="nav-item dropdown mx-2">
            <Link
              className={`nav-link dropdown-toggle ${styles.navLink}`}
              to="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              <FaBoxOpen className={styles.icon} /> Products
            </Link>
            <ul
              className={`dropdown-menu ${
                darkMode ? styles.dropdownDark : styles.dropdownLight
              }`}
            >
              <li>
                <Link
                  className={`dropdown-item d-flex align-items-center gap-2 text-capitalize ${styles.dropdownItem}`}
                  to={`/all-products`}
                >
                  <FaThLarge />
                  All Products
                </Link>
              </li>
              {["fashion", "electronics", "bags", "groceries", "beauty"].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      className={`dropdown-item d-flex align-items-center gap-2 text-capitalize ${styles.dropdownItem}`}
                      to={`/category/${cat}`}
                    >
                      {categoryIcons[cat]} {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </li>

          {isLoggedIn ? (
            <li className="nav-item dropdown mx-2">
              <Link
                className={`nav-link dropdown-toggle ${styles.navLink}`}
                to="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <FaSignInAlt className={styles.icon} /> Account
              </Link>
              <ul
                className={`dropdown-menu ${
                  darkMode ? styles.dropdownDark : styles.dropdownLight
                }`}
              >
                <li>
                  <Link
                    className={`dropdown-item d-flex align-items-center gap-2 ${styles.dropdownItem}`}
                    onClick={handleSignOut}
                  >
                    <FaSignOutAlt /> Sign Out
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            <li className="nav-item mx-2">
              <Link className={`nav-link ${styles.navLink}`} to="/signin">
                <FaSignInAlt className={styles.icon} /> Sign In
              </Link>
            </li>
          )}

          <li className="nav-item mx-2">
            <button
              className={`btn btn-sm ${styles.toggleBtn}`}
              onClick={toggleTheme}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </li>
        </ul>
      </div>

      {/* Logout Success Popup */}
      {showLogoutPopup && (
        <div className={styles.logoutPopup} role="alert" aria-live="assertive">
          <p>Logout Successfully!</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
