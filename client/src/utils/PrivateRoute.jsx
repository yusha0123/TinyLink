import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return <Outlet />;
  }
  return <Navigate to="/login" />;
};

export default PrivateRoute;
