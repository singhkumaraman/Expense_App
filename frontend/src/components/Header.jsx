import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SiAnalogue } from "react-icons/si";
import { GlobalContext } from "../context/GlobalContext";

const Header = () => {
  const { token, logout } = useContext(GlobalContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = !!token;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white/60 backdrop-blur-md border-b border-white/20 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-2 text-indigo-700 hover:text-purple-600 transition-colors duration-300"
        >
          <SiAnalogue className="text-2xl" />
          <span className="font-bold text-lg bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            CashUe
          </span>
        </Link>

        <button
          className="lg:hidden text-indigo-700 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          <NavLinks isAuthenticated={isAuthenticated} logout={logout} />
        </nav>
      </div>

      {/* Mobile Dropdown Nav */}
      {isMenuOpen && (
        <div className="lg:hidden px-4 pb-4 transition-all duration-300 ease-in-out">
          <nav className="flex flex-col space-y-2">
            <NavLinks
              mobile
              isAuthenticated={isAuthenticated}
              logout={logout}
            />
          </nav>
        </div>
      )}
    </header>
  );
};

// NavLinks Component for reuse
const NavLinks = ({ mobile = false, isAuthenticated, logout }) => {
  const linkClass =
    "text-gray-800 hover:text-indigo-600 font-medium transition-all duration-300";
  const buttonBase =
    "px-4 py-2 rounded-xl font-semibold shadow transition duration-300";

  return (
    <>
      <Link to="/" className={linkClass}>
        Home
      </Link>
      <Link to="/analytics" className={linkClass}>
        Analytics
      </Link>
      <Link to="/contact" className={linkClass}>
        Contact
      </Link>

      {isAuthenticated ? (
        <button
          onClick={logout}
          className={`${buttonBase} text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 ${
            mobile ? "mt-2" : ""
          }`}
        >
          Sign Out
        </button>
      ) : (
        <Link
          to="/login"
          className={`${buttonBase} text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 ${
            mobile ? "mt-2 text-center" : ""
          }`}
        >
          Sign In
        </Link>
      )}
    </>
  );
};

export default Header;
