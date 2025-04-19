import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const token = localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user');
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAvatarOpen(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleAvatar = () => setAvatarOpen((prev) => !prev);
  const avatarLetter = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <nav className="bg-yellow-400 shadow-md px-4 sm:px-8 py-4">
      <div className="flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-purple-700 text-2xl font-bold flex items-center gap-2">
          <span role="img" aria-label="home">🏠</span> HOMEHUNT
        </Link>

        {/* Hamburger for mobile */}
        <button className="sm:hidden text-purple-700" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-4 text-purple-800 font-medium text-sm sm:text-base">
          {token ? (
            <>
              <Link to="/dashboard" className="hover:text-purple-900 transition">Dashboard</Link>
              <Link to="/properties" className="hover:text-purple-900 transition">Properties</Link>
              {user?.role === 'admin' && (
                <Link to="/add-property" className="hover:text-purple-900 transition">Add</Link>
              )}

              {/* Avatar dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleAvatar}
                  className="flex items-center gap-2 bg-purple-700 text-white px-3 py-1 rounded-full hover:bg-purple-800"
                >
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-purple-700 font-bold">
                    {avatarLetter}
                  </div>
                  <ChevronDown size={16} />
                </button>

                {avatarOpen && (
                  <div className="absolute right-0 mt-2 bg-white rounded shadow-md w-40 z-50">
                    <Link
                      to="/profile"
                      onClick={() => setAvatarOpen(false)}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-purple-900 transition">Login</Link>
              <Link to="/register" className="hover:text-purple-900 transition">Register</Link>
            </>
          )}

          {/* About link */}
          <Link to="/about" className="hover:text-purple-900 transition">About</Link>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-3 text-purple-800 font-medium text-base">
          {token ? (
            <>
              <Link to="/dashboard" onClick={toggleMenu} className="hover:text-purple-900">Dashboard</Link>
              <Link to="/properties" onClick={toggleMenu} className="hover:text-purple-900">Properties</Link>
              {user?.role === 'admin' && (
                <Link to="/add-property" onClick={toggleMenu} className="hover:text-purple-900">Add</Link>
              )}
              <Link to="/profile" onClick={toggleMenu} className="hover:text-purple-900">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu} className="hover:text-purple-900">Login</Link>
              <Link to="/register" onClick={toggleMenu} className="hover:text-purple-900">Register</Link>
            </>
          )}

          {/* About link for mobile */}
          <Link to="/about" onClick={toggleMenu} className="hover:text-purple-900">About</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
