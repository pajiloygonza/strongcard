import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRoute = ({ children }) => {
  const { isLogged } = useSelector(({ auth }) => ({
    isLogged: auth.logged,
  }));

  if (!isLogged) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};

export const NonAuthRoute = ({ children }) => {
  const { isLogged } = useSelector(({ auth }) => ({
    isLogged: auth.logged,
  }));

  if (isLogged) {
    return <Navigate to="/app" replace />;
  }

  return children || <Outlet />;
};
