import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
      if(!json.success){
        alert("Enter Valid Credentials");
      }
      else{
        navigate("/");
      }

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="d-grid gap-2">
        <button type="submit" className="btn btn-success">
        Login
        </button>
        </div>
        <Link to="/register" >
          I'm a new User
        </Link>
      </form>
    </div>
  );
   
}
