import React, { createContext, useState } from "react";

export const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);

  const addDocument = (doc) => {
    setDocuments([...documents, doc]);
  };

  const removeDocument = (index) => {
    const updated = documents.filter((_, i) => i !== index);
    setDocuments(updated);
  };

  return (
    <DocumentContext.Provider
      value={{ documents, addDocument, removeDocument }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
