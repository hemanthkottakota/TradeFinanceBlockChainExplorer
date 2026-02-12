import React, { useContext, useState } from "react";
import Layout from "../layout/Layout";
import { DocumentContext } from "../../context/DocumentContext";
import "./UploadDocument.css";

function UploadDocument() {
  const { documents, addDocument, removeDocument } =
    useContext(DocumentContext);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = () => {
    selectedFiles.forEach((file) => {
      addDocument({
        name: file.name,
        size: file.size,
        date: new Date().toLocaleString(),
      });
    });

    setSelectedFiles([]);
  };

  return (
    <Layout>
      <div className="upload-page">
        <h2>Upload Trade Documents</h2>
        <div className="upload-wrapper">
          <div className="upload-box">
            <p className="upload-title">Select Documents</p>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="file-input"
            />
            <button
              className="upload-btn"
              onClick={handleUpload}
              disabled={selectedFiles.length === 0}
            >
              Upload Documents
            </button>
          </div>
        </div>
        <div className="uploaded-section">
          <h3>Uploaded Documents</h3>

          {documents.length === 0 && (
            <p className="empty-text">No documents uploaded yet.</p>
          )}

          {documents.map((doc, index) => (
            <div className="file-item" key={index}>
              <div>
                <strong>{doc.name}</strong>
                <p>{doc.date}</p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeDocument(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default UploadDocument;
