import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { clearAuth, getUserProfile } from "./auth";

function Navbar() {
  const navigate = useNavigate();
  const profile = getUserProfile();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h3>{profile?.org_name ? `${profile.org_name} Workspace` : "Trade Finance System"}</h3>
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
