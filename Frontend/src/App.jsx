import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from './features/auth/authSlice';
import Footer from './components/Footer/Footer'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PropertyList from './components/PropertyList';
import AddProperty from './components/AddProperty';
import Navbar from './components/Navbar';
import unauthorized from './components/unauthorized'; 
import About from './components/About/About'; // Import the About component
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Default route now directly renders Dashboard */}
        <Route path="/" element={<Dashboard />} />
        <Route path = "/about" element={<About />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes for admin */}
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/add-property" element={<AddProperty />} />

        {/* Unauthorized route */}
        <Route path="/unauthorized" element={<unauthorized/>} />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
