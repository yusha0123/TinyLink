import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Outlet />;
  }
  return <Navigate to="/home" />;
};

export default PublicRoute;
