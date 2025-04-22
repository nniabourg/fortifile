import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../main.css";

function NavBar({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="nav-container">
      <div className="logo">FortiFile</div>
      {location.pathname !== "/" && (
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/upload">Encrypt</Link></li>
          <li><Link to="/decrypt">Decrypt</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><a href="/" onClick={handleLogout}>Logout</a></li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
