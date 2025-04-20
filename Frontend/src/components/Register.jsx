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
  const [fadeIn, setFadeIn] = useState(false);

  React.useEffect(() => {
    setFadeIn(true);
  }, []);

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
      dispatch(setUser(result.payload.user));
      localStorage.setItem('token', result.payload.token);
      localStorage.setItem('user', JSON.stringify(result.payload.user));
      localStorage.setItem('role', result.payload.user.role);

      toast.success('🎉 Registration successful!');
      setTimeout(() => navigate('/'), 1500);
    } else {
      toast.error(result.payload?.message || 'Registration failed');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-yellow-50 to-purple-200 overflow-hidden">
      <ToastContainer />
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-70 animate-ping"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      <div
        className={`relative z-10 w-full max-w-md p-8 bg-white shadow-2xl rounded-xl transform transition-all duration-700 ${
          fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-700 tracking-wide">
          HomeHunt Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="👤 Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-purple-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-purple-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="🔒 Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-purple-300 px-4 py-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-purple-600 hover:underline"
            >
              {showPassword ? '🙈 Hide' : '👁️ Show'}
            </button>
          </div>

          {/* 🎯 Toggle buttons for role */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'user' })}
              className={`px-4 py-2 rounded-full border font-medium transition-all duration-300 transform hover:scale-105 ${
                formData.role === 'user'
                  ? 'bg-yellow-400 text-purple-800 border-yellow-400'
                  : 'bg-white text-yellow-600 border-yellow-300'
              }`}
            >
              👤 User
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, role: 'admin' })}
              className={`px-4 py-2 rounded-full border font-medium transition-all duration-300 transform hover:scale-105 ${
                formData.role === 'admin'
                  ? 'bg-yellow-400 text-purple-800 border-yellow-400'
                  : 'bg-white text-yellow-600 border-yellow-300'
              }`}
            >
              🛠️ Admin
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-purple-800 font-semibold py-2 rounded-lg hover:bg-yellow-500 transition-all duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Registering...' : '📝 Register'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-700 hover:underline font-medium">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
