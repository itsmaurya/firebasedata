import React from 'react'

import "./Navbar.css"
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container container">
          <input type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className="menu-items">
            <Link to="/"><li>Home</li></Link>
            <Link to="/"><li>Gallery</li></Link>
            <Link to="/"><li>About Us</li></Link>
            <Link to='/'><li>Contact Us</li></Link>
           <Link to='/'> <li>Login</li></Link>
          </ul>
        </div>
      </nav>
    </div>
  )
}
