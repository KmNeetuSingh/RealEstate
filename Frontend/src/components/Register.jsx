import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, setUser } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const { email, password } = formData;
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await dispatch(registerUser(formData));
    if (result.payload?.token) {
      dispatch(setUser(result.payload.user)); // ✅ use Redux

      localStorage.setItem('token', result.payload.token);
      localStorage.setItem('user', JSON.stringify(result.payload.user));
      localStorage.setItem('role', result.payload.user.role);

      toast.success('Registration successful!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } else {
      toast.error(result.payload?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-2 mb-4 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="w-full border p-2 pr-10 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2 right-3 text-sm text-blue-600"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
