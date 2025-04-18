import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    return <Navigate to="/login" />;
  }

  // If role prop is provided, check user role
  if (role && user?.role !== role) {
    return <Navigate to="/unauthorized" />; // Or a NotAuthorized page
  }

  return children;
};

export default PrivateRoute;
