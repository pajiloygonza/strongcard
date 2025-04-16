import React, { createContext, useContext } from "react";
import { useSelector } from "react-redux";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isLogged } = useSelector(({ auth }) => ({
    isLogged: auth.logged,
  }));

  return (
    <AuthContext.Provider value={isLogged}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
