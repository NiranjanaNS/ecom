import React from "react";
import { Navigate } from "react-router-dom";

function Auth({ children }) {
  const protect = localStorage.getItem("admin");
  return protect ? children : <Navigate to="/admin/login" />;
}

export default Auth;
