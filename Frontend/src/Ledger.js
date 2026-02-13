import React, { useState } from "react";
import Layout from "../Components/layout/Layout";
import "./Ledger.css";

function Ledger() {

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [ledgerData, setLedgerData] = useState([
    { id: "L-1023", doc: "Invoice", status: "ISSUED", date: "2026-02-12" },
    { id: "L-1024", doc: "Bill of Lading", status: "SHIPPED", date: "2026-02-11" },
    { id: "L-1025", doc: "Payment", status: "COMPLETED", date: "2026-02-10" },
    { id: "L-1026", doc: "Inspection", status: "VERIFIED", date: "2026-02-09" },
  ]);

  const [newEntry, setNewEntry] = useState({
    id: "",
    doc: "",
    status: "ISSUED",
    date: "",
  });
  const handleChange = (e) => {
    setNewEntry({
      ...newEntry,
      [e.target.name]: e.target.value,
    });
  };
  const handleAddLedger = (e) => {
    e.preventDefault();

    if (!newEntry.id || !newEntry.doc || !newEntry.date) {
      alert("Please fill all fields");
      return;
    }

    setLedgerData([...ledgerData, newEntry]);

    setNewEntry({
      id: "",
      doc: "",
      status: "ISSUED",
      date: "",
    });

    setShowForm(false);
  };
  const filteredLedger = ledgerData.filter((item) => {
    const matchesSearch = item.doc.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="ledger">
        <h1 className="page-title">Ledger Explorer</h1>
        <div className="ledger-controls">
          <input
            type="text"
            placeholder="Search by Document..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="ISSUED">Issued</option>
            <option value="SHIPPED">Shipped</option>
            <option value="COMPLETED">Completed</option>
            <option value="VERIFIED">Verified</option>
          </select>
          <button
            className="add-ledger-btn"
            onClick={() => setShowForm(!showForm)}
          >
            + New Ledger Entry
          </button>
        </div>
        {showForm && (
          <form className="ledger-form" onSubmit={handleAddLedger}>
            <input
              type="text"
              name="id"
              placeholder="Ledger ID"
              value={newEntry.id}
              onChange={handleChange}
            />
            <input
              type="text"
              name="doc"
              placeholder="Document Name"
              value={newEntry.doc}
              onChange={handleChange}
            />
            <input
              type="date"
              name="date"
              value={newEntry.date}
              onChange={handleChange}
            />
            <select
              name="status"
              value={newEntry.status}
              onChange={handleChange}
            >
              <option value="ISSUED">Issued</option>
              <option value="SHIPPED">Shipped</option>
              <option value="COMPLETED">Completed</option>
              <option value="VERIFIED">Verified</option>
            </select>
            <button type="submit" className="save-btn">
              Save
            </button>
          </form>
        )}
        <div className="ledger-table">
          <div className="ledger-header">
            <span>Ledger ID</span>
            <span>Document</span>
            <span>Status</span>
            <span>Date</span>
          </div>

          {filteredLedger.length > 0 ? (
            filteredLedger.map((item) => (
              <div className="ledger-row" key={item.id}>
                <span>{item.id}</span>
                <span>{item.doc}</span>
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
                <span>
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <div className="no-data">
              No ledger records found.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Ledger;
