import React from "react";
import Layout from "../Components/layout/Layout";
import "./Transactions.css";

function Transactions() {
  const transactions = [
    { id: "TX-001", party: "ABC Exports", amount: "$12,500", status: "Completed" },
    { id: "TX-002", party: "Global Traders", amount: "$8,200", status: "Pending" },
    { id: "TX-003", party: "Oceanic Ltd.", amount: "$15,900", status: "In Progress" },
  ];

  return (
    <Layout>
      <div className="transactions">
        <h1 className="page-title">Transactions</h1>

        <div className="transaction-grid">
          {transactions.map((tx) => (
            <div className="transaction-card" key={tx.id}>
              <h3>{tx.id}</h3>
              <p><strong>Party:</strong> {tx.party}</p>
              <p><strong>Amount:</strong> {tx.amount}</p>
              <span className={`tx-status ${tx.status.replace(" ", "").toLowerCase()}`}>
                {tx.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Transactions;
