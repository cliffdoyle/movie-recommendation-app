// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <Link to="/" className="logo-link">
        MovieDiscovery
      </Link>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/watchlist" className="nav-link">My Watchlist</Link>
      </nav>
    </header>
  );
};

export default Header;