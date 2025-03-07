import React from 'react';
import { Link, useLocation } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();

  const handleHomeClick = (event) => {
    if (location.pathname === "/") {
      console.log(1)
      event.preventDefault();
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
    }
  };

  return (
    <nav className="nav-bar">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={handleHomeClick}>
        <i className="icon-home"></i>
      </Link>
      <Link to="/leaderboard" className={location.pathname === '/leaderboard' ? 'active' : ''}>
        <i className="icon-leaderboard"></i>
      </Link>
      <Link to="/friends" className={location.pathname === '/friends' ? 'active' : ''}>
        <i className="icon-friends"></i>
      </Link>
      <Link to="/missions" className={location.pathname === '/missions' ? 'active' : ''}>
        <i className="icon-tasks"></i>
      </Link>
    </nav>
  );
};

export default NavBar;
