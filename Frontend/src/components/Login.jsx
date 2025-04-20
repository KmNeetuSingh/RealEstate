import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [showBackendNotice, setShowBackendNotice] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const timeout = setTimeout(() => {
      setShowBackendNotice(true);
    }, 2500);

    const response = await dispatch(loginUser(formData));
    clearTimeout(timeout);
    setShowBackendNotice(false);

    if (response.payload?.token) {
      dispatch(setUser(response.payload.user));
      localStorage.setItem('user', JSON.stringify(response.payload.user));
      localStorage.setItem('token', response.payload.token);
      localStorage.setItem('role', response.payload.user.role);
      toast.success(`🎉 Welcome ${response.payload.user.name || 'back'}!`);
      navigate('/dashboard');
    } else {
      toast.error('❌ Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-yellow-50 to-purple-200 overflow-hidden">
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

      {showBackendNotice && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded shadow transition duration-300 animate-pulse z-50">
          ⚠️ Backend is hosted on Render. If inactive, it may take ~30 sec to wake up.
        </div>
      )}

      <div
        className={`relative z-10 w-full max-w-md p-8 bg-white shadow-2xl rounded-xl transform transition-all duration-700 ${
          fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-700 tracking-wide">
          HomeHunt Login
        </h2>

        {error && (
          <p className="text-yellow-600 text-sm mb-4 text-center font-medium">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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

          {/* Optional: Remember Me */}
          {/* 
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="form-checkbox" />
            <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
          </div>
          */}

          <button
            type="submit"
            className="w-full bg-yellow-400 text-purple-800 font-semibold py-2 rounded-lg hover:bg-yellow-500 transition-all duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : '🚀 Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
