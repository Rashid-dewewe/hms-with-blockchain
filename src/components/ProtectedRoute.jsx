import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />; // Redirect to home or an unauthorized page
  }

  return children;
};

export default ProtectedRoute;