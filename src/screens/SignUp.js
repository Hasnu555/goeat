import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import GoEatIcon from "../image/goeat_icon.png"; // Your icon image

import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaUserPlus } from 'react-icons/fa'; // Importing icons

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/register", {
        name,
        email,
        password,
        location,
      });
      const json = response.data;
      console.log(json);

      if (!json.success) {
        alert("Enter Valid Credentials");
      } else {
        alert("Account Created Successfully");
        navigate("/login"); // Redirect to login page after successful signup
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1518685101044-3b5a4e7580a3?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", // Match background to Login
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          minHeight: "100vh",
          paddingTop: "20px",
        }}
      >
        <div className="row">
          <div className="col-md-6 offset-md-6">
            <div
              className="card my-5"
              style={{
                backgroundColor: "rgba(36, 31, 31, 0.57)",
                border: "none",
                boxShadow: "none",
                borderRadius: "15px",
              }}
            >
              <form className="card-body cardbody-color p-lg-5" onSubmit={handleSubmit}>
                <div className="text-center">
                  <img
                    src={GoEatIcon}
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="100px"
                    alt="profile"
                  />
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaMapMarkerAlt />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-success px-5 mb-5 w-100">
                    <FaUserPlus className="me-2" /> Sign Up
                  </button>
                </div>

                <div className="form-text text-center mb-5 text-white">
                  Already a user?{" "}
                  <Link to="/login" className="text-white fw-bold">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
