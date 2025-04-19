import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If a role is provided, check user's role
  if (role && (!user || user?.role !== role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children; // If authenticated and role matches, render the children
};

export default PrivateRoute;
