import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole"); 
  if (!authToken || userRole !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
