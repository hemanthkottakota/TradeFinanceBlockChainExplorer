import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">TradeX</h2>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/upload">Upload Document</Link>
        <Link to="/ledger">Ledger Explorer</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/risk">Risk Dashboard</Link>
        <Link to="/analytics">Analytics</Link>
        
      </nav>
    </div>
  );
}

export default Sidebar;
