// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element: Component, adminOnly, ...rest }) => {
  const { user, admin } = useAuth();

  if (!user && !admin) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !admin) {
    return <Navigate to="/" />;
  }

  if (!adminOnly && admin) {
    return <Navigate to="/admin" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
