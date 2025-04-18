// App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from './features/auth/authSlice';

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PropertyList from './components/PropertyList';
import AddProperty from './components/AddProperty';
import Navbar from './components/Navbar';
import PrivateRoute from './utils/PrivateRoute';

const Fallback = () => <div>Welcome! Please log in.</div>;

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Fallback />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/properties" element={<PrivateRoute><PropertyList /></PrivateRoute>} />
        <Route path="/add-property" element={<PrivateRoute><AddProperty /></PrivateRoute>} />
      </Routes>
    </>
  );
};

export default App;
