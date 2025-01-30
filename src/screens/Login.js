import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import GoEatIcon from "../image/goeat_icon.png"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/login", {
        email,
        password,
      });
      const json = response.data;
      console.log(json);
      if (!json.success) {
        alert("Enter Valid Credentials");
      } else {
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("userRole", json.userRole);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1518685101044-3b5a4e7580a3?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          minHeight: "100vh", // Ensures the div takes up full viewport height
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
              <form
                className="card-body cardbody-color p-lg-5"
                onSubmit={handleSubmit}
              >
                <div className="text-center">
                  <img
                    src={GoEatIcon}
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="100px"
                    alt="profile"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-success px-5 mb-5 w-100"
                  >
                    Login
                  </button>
                </div>
                <div
                  id="emailHelp"
                  className="form-text text-center mb-5 text-white"
                >
                  Not Registered?{" "}
                  <Link to="/register" className="text-white fw-bold">
                    Create an Account
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
