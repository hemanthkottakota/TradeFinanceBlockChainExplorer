import React, { useState } from "react";
import Layout from "../Components/layout/Layout";
import "./Transactions.css";

function Transactions() {

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [transactions, setTransactions] = useState([
    { id: "TX-001", party: "ABC Exports", amount: 12500, status: "Completed" },
    { id: "TX-002", party: "Global Traders", amount: 8200, status: "Pending" },
    { id: "TX-003", party: "Oceanic Ltd.", amount: 15900, status: "In Progress" },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    id: "",
    party: "",
    amount: "",
    status: "Pending",
  });

  // Handle form input
  const handleChange = (e) => {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  // Add transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();

    if (!newTransaction.id || !newTransaction.party || !newTransaction.amount) {
      alert("Please fill all fields");
      return;
    }

    setTransactions([...transactions, {
      ...newTransaction,
      amount: Number(newTransaction.amount),
    }]);

    setNewTransaction({
      id: "",
      party: "",
      amount: "",
      status: "Pending",
    });

    setShowForm(false);
  };

  // Filter logic
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.party.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || tx.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="transactions">
        <h1 className="page-title">Trade Transactions</h1>

        {/* Top Controls */}
        <div className="top-controls">
          <input
            type="text"
            placeholder="Search by Party..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
          </select>

          <button
            className="add-btn"
            onClick={() => setShowForm(!showForm)}
          >
            + New Transaction
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form className="transaction-form" onSubmit={handleAddTransaction}>
            <input
              type="text"
              name="id"
              placeholder="Transaction ID"
              value={newTransaction.id}
              onChange={handleChange}
            />

            <input
              type="text"
              name="party"
              placeholder="Party Name"
              value={newTransaction.party}
              onChange={handleChange}
            />

            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={handleChange}
            />

            <select
              name="status"
              value={newTransaction.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
            </select>

            <button type="submit" className="save-btn">
              Save
            </button>
          </form>
        )}

        {/* Cards */}
        <div className="transaction-grid">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => (
              <div className="transaction-card" key={tx.id}>
                <h3>{tx.id}</h3>
                <p><strong>Party:</strong> {tx.party}</p>
                <p><strong>Amount:</strong> ${tx.amount.toLocaleString()}</p>

                <span
                  className={`tx-status ${tx.status
                    .replace(" ", "")
                    .toLowerCase()}`}
                >
                  {tx.status}
                </span>
              </div>
            ))
          ) : (
            <p className="no-data">No transactions found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Transactions;
