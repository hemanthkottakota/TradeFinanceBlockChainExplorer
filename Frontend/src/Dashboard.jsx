import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { api } from "./api";
import "./Dashboard.css";

function Dashboard() {
  const [orgContext, setOrgContext] = useState(null);

  useEffect(() => {
    const loadContext = async () => {
      try {
        const response = await api.get("/orgs/me");
        setOrgContext(response.data);
      } catch {
        setOrgContext(null);
      }
    };

    loadContext();
  }, []);

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
          <div>
            <h1>Trade Finance Blockchain Explorer</h1>
            {orgContext && (
              <p>
                Organization: {orgContext.org_name} | Role: {orgContext.role}
              </p>
            )}
          </div>
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
          <Link to="/ledger" className="action-btn">
            View Ledger Explorer
          </Link>
          <Link to="/transactions" className="action-btn">
            Manage Transactions
          </Link>
          <Link to="/analytics" className="action-btn">
            Analytics & Reports
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
