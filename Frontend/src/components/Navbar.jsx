import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin); // <-- this gets updated instantly after login/register

  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    }
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' }); // optional: update redux state
    setMenuOpen(false);
    navigate('/');
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleAvatar = () => setAvatarOpen((prev) => !prev);
  const avatarLetter = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <nav className="bg-yellow-400 shadow-md px-4 sm:px-6 py-4">
      <div className="flex justify-between items-center gap-2 sm:gap-1">
        <Link to="/" className="text-purple-700 text-xl sm:text-2xl font-bold flex items-center gap-2 mr-2">
          🏠 HOMEHUNT
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center gap-3 text-purple-800 font-medium text-sm sm:text-base">
          <Link to="/about" className="hover:text-purple-900 transition mr-3">About</Link>
          <Link to="/properties" className="hover:text-purple-900 transition mr-3">Properties</Link>
          <Link to="/contact" className="hover:text-purple-900 transition mr-3">Contact</Link>

          {!token ? (
            <>
              <Link to="/login" className="hover:text-purple-900 transition mr-3">Login</Link>
              <Link to="/register" className="hover:text-purple-900 transition mr-3">Register</Link>
            </>
          ) : (
            <>
              {isAdmin && (
                <Link to="/add-property" className="hover:text-purple-900 transition mr-3">Add</Link>
              )}
              <div className="relative" ref={dropdownRef}>
                <button onClick={toggleAvatar} className="flex items-center gap-2 bg-purple-700 text-white px-3 py-1 rounded-full hover:bg-purple-800">
                  <div className="w-7 h-7 flex items-center justify-center rounded-full bg-white text-purple-700 font-bold">
                    {avatarLetter}
                  </div>
                  <ChevronDown size={16} />
                </button>
                {avatarOpen && (
                  <div className="absolute right-0 mt-2 bg-white rounded shadow-md w-40 z-50">
                    <Link to="/profile" onClick={() => setAvatarOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button className="sm:hidden text-purple-700" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out`} style={{ maxHeight: menuOpen ? `${menuHeight + 100}px` : '0px' }}>
        <div ref={menuRef} className="mt-4 flex flex-col gap-4 px-2 pb-4 text-purple-800 font-medium text-base">
          <Link to="/about" onClick={toggleMenu} className="hover:text-purple-900 py-2">About</Link>
          <Link to="/properties" onClick={toggleMenu} className="hover:text-purple-900 py-2">Properties</Link>
          <Link to="/contact" onClick={toggleMenu} className="hover:text-purple-900 py-2">Contact</Link>

          {!token ? (
            <>
              <Link to="/login" onClick={toggleMenu} className="hover:text-purple-900 py-2">Login</Link>
              <Link to="/register" onClick={toggleMenu} className="hover:text-purple-900 py-2">Register</Link>
            </>
          ) : (
            <>
              {isAdmin && (
                <Link to="/add-property" onClick={toggleMenu} className="hover:text-purple-900 py-2">Add</Link>
              )}
              <Link to="/profile" onClick={toggleMenu} className="hover:text-purple-900 py-2">Profile</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 mt-1">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
