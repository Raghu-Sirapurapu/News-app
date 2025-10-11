import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getAuthUser, isLoggedIn as checkLogin, isAdmin as checkAdmin } from '../utils/auth';
import { jntukLogo } from '../assets/assets'


const Navbar = () => {

  const [open, setOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = getAuthUser();
  const id = user?.userId;

  useEffect(() => {
    setIsLoggedIn(checkLogin());
    setIsAdmin(checkAdmin());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setShowProfileDropdown(false);
    navigate('/login');
  };

  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#FAFAFA]  shadow-md fixed top-0 w-full z-50 border-b border-[#7B5DD6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img
              src={jntukLogo}
              alt="JNTUK Logo"
              className="
      h-9 w-9 sm:h-10 sm:w-10
      min-w-[2.25rem] min-h-[2.25rem] sm:min-w-[2.5rem] sm:min-h-[2.5rem]
      transition-all duration-200
    "
              style={{ display: "block" }}
            />
            <span className="text-lg sm:text-2xl font-bold text-black tracking-tight select-none whitespace-nowrap">
              JNTUK-NEWS
            </span>
          </Link>


          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center font-medium">
            <a
              href="/"
              className={`transition-colors duration-200 ${isActive('/')
                ? 'text-black border-b-2 border-black'
                : 'text-black hover:text-purple-800'
                }`}
            >
              Home
            </a>
            <a
              href="/newsletters"
              className={`transition-colors duration-200 ${isActive('/newsletters')
                ? 'text-black border-b-2 border-black'
                : 'text-black hover:text-purple-800'
                }`}
            >
              Newsletters
            </a>
            <a
              href="/newsletters/upload"
              className={`transition-colors duration-200 ${isActive('/newsletters/upload')
                ? 'text-black border-b-2 border-black'
                : 'text-black hover:text-purple-800'
                }`}
            >
              Upload News
            </a>


            {isLoggedIn ? (
              <div className="relative inline-block">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className={`transition-colors duration-200 cursor-pointer focus:outline-none ${showProfileDropdown ? 'text-black' : 'text-black'
                    } hover:text-purple-800`}
                  aria-haspopup="true"
                  aria-expanded={showProfileDropdown ? 'true' : 'false'}
                >
                  👤 Profile
                </button>
                {showProfileDropdown && (
                  <div className="absolute left-1/2 top-full mt-2 w-48 bg-white text-black rounded-md shadow-lg transform -translate-x-1/2 z-50 border border-[#415a77]">
                    <a
                      href={`/my-submissions/${id}`}
                      className="block px-4 py-2 hover:bg-[#415a77]/30 transition-colors"
                    >
                      My Submissions
                    </a>
                    {isAdmin && (
                      <a
                        href={`/admin/${id}/dashboard`}
                        className="block px-4 py-2 hover:bg-[#415a77]/30  transition-colors"
                      >
                        Admin Dashboard
                      </a>
                    )}
                     <a
                      href="/change-password"
                      className="block px-4 py-2 hover:bg-[#415a77]/30 transition-colors"
                    >
                      Change Password
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-black hover:bg-[#415a77]/30 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className={`transition-colors duration-200 ${isActive('/login')
                  ? 'text-black border-b-2 border-black'
                  : 'text-black hover:text-purple-800'
                  }`}
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-black  focus:outline-none"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-[#415a77] shadow-md">
          <a
            href="/"
            className={`block px-4 py-3 transition ${isActive('/')
              ? 'text-black bg-[#415a77]/30'
              : 'text-black '
              }`}
          >
            Home
          </a>
          <hr className="border-[#415a77] opacity-20" />
          <a
            href="/newsletters"
            className={`block px-4 py-3 transition ${isActive('/newsletters')
              ? 'text-black bg-[#415a77]/30'
              : 'text-black '
              }`}
          >
            Newsletters
          </a>
          <hr className="border-[#415a77] opacity-20" />
          <a
            href="/newsletters/upload"
            className={`block px-4 py-3 transition ${isActive('/newsletters/upload')
              ? 'text-black bg-[#415a77]/30'
              : 'text-black '
              }`}
          >
            Upload News
          </a>
          <hr className="border-[#415a77] opacity-20" />

          {isLoggedIn ? (
            <>
              <a
                href={`/my-submissions/${id}`}
                className={`block px-4 py-3 transition ${isActive(`/my-submissions/${id}`)
            ? 'text-black bg-[#415a77]/30'
              : 'text-black '
              }`}
              >
                My Submissions
              </a>
              <hr className="border-[#415a77] opacity-20" />
              {isAdmin && (
                <>
                  <a
                    href={`/admin/${id}/dashboard`}
                    className={`block px-4 py-3 transition ${isActive(`/my-submissions/${id}`)
            ? 'text-black bg-[#415a77]/30'
              : 'text-black '
              }`}>
                    Admin Dashboard
                  </a>
                  <hr className="border-[#415a77] opacity-20" />
                </>
              )}
              <hr className="border-[#415a77] opacity-20" />
              {/* ✅ Change Password Option */}
              <a
                href="/change-password"
                className="block px-4 py-3 text-black hover:bg-[#415a77]/30 transition"
              >
                Change Password
              </a>
              <hr className="border-[#415a77] opacity-20" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-black transition"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="block px-4 py-3 text-black hover:bg-[#415a77]/30  hover:text-purple-800 transition"
            >
              Login
            </a>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
