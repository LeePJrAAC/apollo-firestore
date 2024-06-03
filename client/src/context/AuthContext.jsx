import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
  });

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthState({
      token,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthState({
      token: null,
      isAuthenticated: false,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthState({
      token,
      isAuthenticated: true,
    });
  }, []);

  return <AuthContext.Provider value={{ ...authState, login, logout }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
