// PrivateRoute.js
import React from 'react';
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../controllers/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {

  return isAuthenticated() ? <Component /> : <Navigate to="/login" replace />;
  
};

export default PrivateRoute;