import React from "react";
import Layout from "../Components/layout/Layout";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const stats = {
    documents: 128,
    ledgerEvents: 542,
    transactions: 37,
    riskScore: 72,
  };

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Trade Finance Blockchain Explorer</h1>
          <Link to="/upload" className="upload-btn">
            + Upload Document
          </Link>
        </div>
        <div className="stats-grid">
          <div className="card">
            <h3>Total Documents</h3>
            <p>{stats.documents}</p>
          </div>
          <div className="card">
            <h3>Ledger Entries</h3>
            <p>{stats.ledgerEvents}</p>
          </div>
          <div className="card">
            <h3>Active Transactions</h3>
            <p>{stats.transactions}</p>
          </div>
          <div className="card risk">
            <h3>Avg Risk Score</h3>
            <p>{stats.riskScore}</p>
          </div>
        </div>
        <div className="quick-actions">
          <Link to="/ledger" className="action-btn">View Ledger Explorer</Link>
          <Link to="/transactions" className="action-btn">Manage Transactions</Link>
          <Link to="/analytics" className="action-btn">Analytics & Reports</Link>
        </div>
        <div className="recent-section">
          <h2>Recent Ledger Activity</h2>
          <ul>
            <li>📄 Invoice #INV-1023 ISSUED</li>
            <li>🚢 Bill of Lading SHIPPED</li>
            <li>💰 Transaction #TX-22 marked COMPLETED</li>
            <li>🔍 Integrity Check Verified</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;