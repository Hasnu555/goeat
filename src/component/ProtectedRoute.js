import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken");

  // If no auth token, redirect to login
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children (protected content)
  return children;
};

export default ProtectedRoute;
