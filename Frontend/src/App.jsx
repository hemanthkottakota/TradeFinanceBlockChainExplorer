import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import UploadDocument from "./UploadDocument";
import Transactions from "./Transactions";
import Analytics from "./Analytics";
import Ledger from "./Ledger";
import RiskDashboard from "./RiskDashboard";
import Layout from "./Layout";
import { DocumentProvider } from "./DocumentContext";

function App() {
  return (
    <BrowserRouter>
      <DocumentProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<UploadDocument />} />
          <Route path="/ledger" element={<Ledger />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route
            path="/risk"
            element={
              <Layout>
                <RiskDashboard />
              </Layout>
            }
          />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </DocumentProvider>
    </BrowserRouter>
  );
}

export default App;
