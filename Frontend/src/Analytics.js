import React from "react";
import Layout from "../Components/layout/Layout";
import "./Analytics.css";

function Analytics() {
  return (
    <Layout>
      <div className="analytics">
        <h1 className="page-title">Analytics & Reports</h1>

        <div className="analytics-cards">
          <div className="analytics-card">
            <h3>Document Growth</h3>
            <p>128 documents uploaded this month</p>
          </div>

          <div className="analytics-card">
            <h3>Risk Overview</h3>
            <p>Average risk score: 72</p>
          </div>

          <div className="analytics-card">
            <h3>Transaction Volume</h3>
            <p>37 active transactions</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Analytics;
