import React from "react";
import { Link } from "react-router-dom";
// import {navbar navbar-default navbar-header navbar-brand nav navbar-nav navbar-right} from 'react-bootstrap';

function Header() {
  return (
    <nav className="navbar navbar-default ">
      <div className="container">
        <div className="navbar-header">
          <p className="navbar-brand">DAILY JOURNAL</p>
        </div>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/about">ABOUT US</Link>
          </li>
          <li>
            <Link to="/contact">CONTACT US</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
