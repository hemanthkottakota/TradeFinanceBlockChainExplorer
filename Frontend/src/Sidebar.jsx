import React from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "./auth";
import "./Sidebar.css";

const navItems = {
  ADMIN: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/upload", label: "Upload Document" },
    { to: "/ledger", label: "Ledger Explorer" },
    { to: "/transactions", label: "Transactions" },
    { to: "/risk", label: "Risk Dashboard" },
    { to: "/analytics", label: "Analytics" },
    { to: "/profile", label: "Profile" },
  ],
  BANK: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/upload", label: "Upload Document" },
    { to: "/transactions", label: "Transactions" },
    { to: "/analytics", label: "Analytics" },
    { to: "/profile", label: "Profile" },
  ],
  CORPORATE: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/upload", label: "Upload Document" },
    { to: "/transactions", label: "Transactions" },
    { to: "/profile", label: "Profile" },
  ],
  AUDITOR: [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/ledger", label: "Ledger Explorer" },
    { to: "/risk", label: "Risk Dashboard" },
    { to: "/analytics", label: "Analytics" },
    { to: "/profile", label: "Profile" },
  ],
};

function Sidebar() {
  const profile = getUserProfile();
  const role = profile?.role || "BANK";
  const items = navItems[role] || navItems.BANK;

  return (
    <div className="sidebar">
      <h2 className="logo">TradeX</h2>
      <p style={{ margin: "0 0 1rem 0", opacity: 0.7, fontSize: "0.85rem" }}>{role}</p>
      <nav>
        {items.map((item) => (
          <Link key={item.to} to={item.to}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
