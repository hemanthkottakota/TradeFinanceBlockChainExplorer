import React from "react";
import Layout from "../Components/layout/Layout";
import "./Analytics.css";

function Analytics() {

  // Simulated Database Data (Matches Your Schema)

  const tradeTransactions = [
    { id: 1, buyer: "ABC Corp", seller: "Global Exports", amount: 50000, currency: "USD", status: "completed", created_at: "2026-01-01" },
    { id: 2, buyer: "Delta Ltd", seller: "Ocean Traders", amount: 75000, currency: "EUR", status: "pending", created_at: "2026-01-05" },
    { id: 3, buyer: "Prime Inc", seller: "Asia Supplies", amount: 120000, currency: "USD", status: "in_progress", created_at: "2026-01-10" },
    { id: 4, buyer: "ABC Corp", seller: "Ocean Traders", amount: 30000, currency: "USD", status: "disputed", created_at: "2026-01-12" }
  ];

  const riskScores = [
    { user: "ABC Corp", score: 35, last_updated: "2026-01-12" },
    { user: "Delta Ltd", score: 72, last_updated: "2026-01-12" },
    { user: "Prime Inc", score: 85, last_updated: "2026-01-12" }
  ];

  const documents = 24;
  const verifiedDocuments = 20;

  // ===== Calculations =====

  const totalVolume = tradeTransactions.reduce((acc, t) => acc + t.amount, 0);

  const statusCounts = {
    pending: tradeTransactions.filter(t => t.status === "pending").length,
    in_progress: tradeTransactions.filter(t => t.status === "in_progress").length,
    completed: tradeTransactions.filter(t => t.status === "completed").length,
    disputed: tradeTransactions.filter(t => t.status === "disputed").length
  };

  const avgRisk = (
    riskScores.reduce((acc, r) => acc + r.score, 0) /
    riskScores.length
  ).toFixed(1);

  const highRiskCount = riskScores.filter(r => r.score > 70).length;

  // ===== Export Trade Report =====

  const exportTradeReport = () => {
    const headers = "ID,Buyer,Seller,Amount,Currency,Status,Created Date\n";
    const rows = tradeTransactions.map(t =>
      `${t.id},${t.buyer},${t.seller},${t.amount},${t.currency},${t.status},${t.created_at}`
    ).join("\n");

    downloadCSV(headers + rows, "Trade_Transactions_Report.csv");
  };

  // ===== Export Risk Report =====

  const exportRiskReport = () => {
    const headers = "Organization,Risk Score,Risk Level,Last Updated\n";
    const rows = riskScores.map(r => {
      const level = r.score > 70 ? "High" : r.score > 40 ? "Medium" : "Low";
      return `${r.user},${r.score},${level},${r.last_updated}`;
    }).join("\n");

    downloadCSV(headers + rows, "Risk_Assessment_Report.csv");
  };

  const downloadCSV = (content, fileName) => {
    const blob = new Blob([content], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="analytics-container">

        <h1 className="title">Trade Finance Analytics Dashboard</h1>

        <div className="grid">

          <div className="card">
            <h3>Total Trade Volume</h3>
            <p>${totalVolume.toLocaleString()}</p>
          </div>

          <div className="card">
            <h3>Total Documents</h3>
            <p>{documents}</p>
          </div>

          <div className="card">
            <h3>Verified Documents</h3>
            <p>{verifiedDocuments}</p>
          </div>

          <div className="card">
            <h3>Average Risk Score</h3>
            <p>{avgRisk}</p>
          </div>

        </div>

        <div className="status-section">
          <h2>Transaction Status Overview</h2>
          <div className="status-grid">
            <div>Pending: {statusCounts.pending}</div>
            <div>In Progress: {statusCounts.in_progress}</div>
            <div>Completed: {statusCounts.completed}</div>
            <div>Disputed: {statusCounts.disputed}</div>
          </div>
        </div>

        <div className="risk-section">
          <h2>High Risk Entities</h2>
          <p>{highRiskCount} organizations above risk threshold</p>
        </div>

        <div className="export-section">
          <button onClick={exportTradeReport}>Export Trade Report</button>
          <button onClick={exportRiskReport}>Export Risk Report</button>
        </div>

      </div>
    </Layout>
  );
}

export default Analytics;
