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
import Profile from "./Profile";
import AuthGuard from "./AuthGuard";
import { DocumentProvider } from "./DocumentContext";

function Protected({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}

function App() {
  return (
    <BrowserRouter>
      <DocumentProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
          <Route
            path="/upload"
            element={
              <Protected>
                <UploadDocument />
              </Protected>
            }
          />
          <Route
            path="/ledger"
            element={
              <Protected>
                <Ledger />
              </Protected>
            }
          />
          <Route
            path="/transactions"
            element={
              <Protected>
                <Transactions />
              </Protected>
            }
          />
          <Route
            path="/risk"
            element={
              <Protected>
                <Layout>
                  <RiskDashboard />
                </Layout>
              </Protected>
            }
          />
          <Route
            path="/analytics"
            element={
              <Protected>
                <Analytics />
              </Protected>
            }
          />
          <Route
            path="/profile"
            element={
              <Protected>
                <Profile />
              </Protected>
            }
          />
        </Routes>
      </DocumentProvider>
    </BrowserRouter>
  );
}

export default App;
