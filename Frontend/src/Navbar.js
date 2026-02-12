import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h3>Trade Finance System</h3>
      <Link to="/"> 
      <button className="logout">Logout</button>
      </Link>
    </div>
  );
}

export default Navbar;
