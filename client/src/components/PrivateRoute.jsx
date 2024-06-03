import { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to='/login' replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
