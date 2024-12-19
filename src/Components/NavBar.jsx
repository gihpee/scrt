import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="nav-bar">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        <i className="icon-home"></i>
      </Link>
      <Link to="/leaderboard" className={location.pathname === '/leaderboard' ? 'active' : ''}>
        <i className="icon-leaderboard"></i>
      </Link>
      <Link to="/friends" className={location.pathname === '/friends' ? 'active' : ''}>
        <i className="icon-friends"></i>
      </Link>
      <Link to="/tasks" className={location.pathname === '/tasks' ? 'active' : ''}>
        <i className="icon-tasks"></i>
      </Link>
    </nav>
  );
};

export default NavBar;
