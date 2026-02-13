import React from "react";
import "./Risk.css";

const RiskDashboard = () => {
  // dummy 
  const riskData = [
    {
      user: "ABC Corporation",
      score: 82,
      rationale: "On-time payments, verified documents, low dispute rate"
    },
    {
      user: "XYZ Traders",
      score: 45,
      rationale: "Delayed shipments, 2 disputed transactions"
    },
    {
      user: "Global Exports Ltd",
      score: 67,
      rationale: "Minor invoice mismatch, moderate transaction volume"
    }
  ];

  const getRiskLevel = (score) => {
    if (score >= 75) return "Low Risk";
    if (score >= 50) return "Medium Risk";
    return "High Risk";
  };

  return (
    <div className="risk-container">
      <h2 className="risk-title">Counterparty Risk Dashboard</h2>

      <div className="risk-grid">
        {riskData.map((item, index) => (
          <div key={index} className="risk-card">
            <h3>{item.user}</h3>
            <p className="risk-score">Score: {item.score}</p>
            <p className="risk-level">
              {getRiskLevel(item.score)}
            </p>
            <p className="risk-rationale">{item.rationale}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskDashboard;
