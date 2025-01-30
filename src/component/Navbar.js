import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/login"); 
  };

  const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoEat
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/") ? "active" : ""}`}
                  aria-current="page"
                  to="/"
                >
                  <FaHome className="me-2" /> Home
                </Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${isActive("/cart") ? "active" : ""}`}
                      to="/cart"
                    >
                      <FaShoppingCart className="me-2" /> Cart
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-danger nav-link"
                      onClick={handleLogout}
                      style={{ border: "none", cursor: "pointer" }}
                    >
                      <FaSignOutAlt className="me-2" /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${isActive("/login") ? "active" : ""}`}
                      to="/login"
                    >
                      <FaSignInAlt className="me-2" /> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link ${isActive("/register") ? "active" : ""}`}
                      to="/register"
                    >
                      <FaUserPlus className="me-2" /> Signup
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
