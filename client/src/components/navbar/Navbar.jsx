
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
<nav className="navbar">
  <div className='navbar-left'>
    <a href='/'>Village</a>
  </div>

  <div className="navbar-center">
    <ul className="nav-links">
      <li>
        <a href="/Events">Events</a>
      </li>
      <li>
        <a href="/Forum">Forum</a>
      </li>
      <li>
        <a href="/AboutUs">About Us</a>
      </li>
    </ul>

    <div className="navbar-right">
    <a href="/account" className="user-icon">
      <i className="fas fa-user"></i>
    </a>
  </div>
  </div>
</nav>
);
};

export default Navbar;