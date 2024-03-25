// Navbar.jsx

import React from 'react';
import user_icon from '../Assets/user.jpeg';
import './Navbar.css';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav>
      <img src={user_icon} alt="" style={{ width: "80px", height: "80px", borderRadius: '50%' }} />
      <ul>
        <li><Link to={'alltasks'}>Today's Task</Link></li>
        <li><Link to={'acceptedtasks'}>My Tasks</Link></li>
        <li><Link to={"/profile"}> Profile</Link></li>
        <li><Link to={"/aboutUs"}>About Us</Link></li>
        <li><Link to={"/all"}>Review</Link></li>
        <li><Link to={'/signup'}>Signup</Link></li>
        <li><Link to={'/login'}>Login</Link></li>
        <li><Link to={'/'}>Home</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;
