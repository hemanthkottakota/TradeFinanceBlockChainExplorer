import React from "react";
import Layout from "../Components/layout/Layout";
import "./Ledger.css";

function Ledger() {
  const ledgerData = [
    { id: "L-1023", doc: "Invoice", status: "ISSUED", date: "12 Feb 2026" },
    { id: "L-1024", doc: "Bill of Lading", status: "SHIPPED", date: "11 Feb 2026" },
    { id: "L-1025", doc: "Payment", status: "COMPLETED", date: "10 Feb 2026" },
    { id: "L-1026", doc: "Inspection", status: "VERIFIED", date: "09 Feb 2026" },
  ];

  return (
    <Layout>
      <div className="ledger">
        <h1 className="page-title">Ledger Explorer</h1>

        <div className="ledger-table">
          <div className="ledger-header">
            <span>Ledger ID</span>
            <span>Document</span>
            <span>Status</span>
            <span>Date</span>
          </div>

          {ledgerData.map((item) => (
            <div className="ledger-row" key={item.id}>
              <span>{item.id}</span>
              <span>{item.doc}</span>
              <span className={`status ${item.status.toLowerCase()}`}>
                {item.status}
              </span>
              <span>{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Ledger;
