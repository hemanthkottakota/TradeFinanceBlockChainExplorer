import React, { useState } from "react";
import Layout from "../layout/Layout";
import "./UploadDocument.css";

function UploadDocument() {
  const [doc, setDoc] = useState({
    type: "INVOICE",
    number: "",
    file: null,
    hash: "",
  });
  const generateHash = () => {
    const randomHash = Math.random().toString(36).substring(2, 15);
    setDoc({ ...doc, hash: randomHash });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    generateHash();
    alert("Document uploaded with hash!");
  };
  return (
    <Layout>
      <div className="upload-card">
        <h2>Upload Trade Document</h2>
        <form onSubmit={handleSubmit}>
          <select  onChange={(e) => setDoc({ ...doc, type: e.target.value })}>
            <option>INVOICE</option>
            <option>LOC</option>
            <option>BILL_OF_LADING</option>
            <option>PO</option>
            <option>COO</option>
            <option>INSURANCE_CERT</option>
          </select>
          <input
            placeholder="Document Number"
            onChange={(e) =>
              setDoc({ ...doc, number: e.target.value })
            }/>
          <input
            type="file"
            onChange={(e) =>
              setDoc({ ...doc, file: e.target.files[0] })
            }/>
          <button type="submit">Upload</button>
          {doc.hash && <p className="hash">Hash: {doc.hash}</p>}
        </form>
      </div>
    </Layout>
  );
}

export default UploadDocument;
