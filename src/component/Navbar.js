import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import Lottie from "react-lottie";
import navAnimation from "../animations/nav-animation.json";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/login"); 
  };

  const isLoggedIn = !!localStorage.getItem("authToken");

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: navAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
      <div className="container d-flex align-items-center">
        <Lottie options={defaultOptions} height={50} width={50} />
        <Link className="navbar-brand fs-2 fw-bold text-light ms-2" to="/">
          GoEat
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/") ? "active fw-bold text-warning" : "text-light"}`} to="/">
                <FaHome className="me-2" /> Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/cart") ? "active fw-bold text-warning" : "text-light"}`} to="/cart">
                    <FaShoppingCart className="me-2" /> Cart
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-warning nav-link px-3 rounded-pill"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/login") ? "active fw-bold text-warning" : "text-light"}`} to="/login">
                    <FaSignInAlt className="me-2" /> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${isActive("/register") ? "active fw-bold text-warning" : "text-light"}`} to="/register">
                    <FaUserPlus className="me-2" /> Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
