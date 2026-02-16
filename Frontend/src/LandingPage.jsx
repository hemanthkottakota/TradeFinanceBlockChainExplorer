import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-container">
      <nav className="landing-navbar">
        <div className="logo-section">
          <img src="/images/logo2.png" alt="Logo" className="logo-img" />
          <h2>Trade Finance Explorer</h2>
        </div>
        <div className="nav-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="register-btn">Register</Link>
        </div>
      </nav>
      <div className="hero-section">
        <div className="hero-text">
          <h1>
            Transparent Trade Compliance <br />
            & Risk Management
          </h1>
          <p>
            Upload, verify, and track trade documents securely with
            tamper-proof audit trails and real-time risk analytics.
          </p>
          <Link to="/login" className="get-started-btn">
            Get Started
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="/images/dashboard.png"
            alt="Dashboard Preview"
            className="hero-img"
          />
        </div>
      </div>
      <div className="features-section">
        <h2 className="features-title">Key Features</h2>
        <div className="cards-container">
          <div className="feature-card">
            <h3>Secure Document Upload</h3>
            <p>
              Upload trade documents safely with encrypted storage and
              tamper-proof verification.
            </p>
          </div>
          <div className="feature-card">
            <h3>Blockchain Hashing</h3>
            <p>
              Each document is assigned a unique hash to ensure integrity
              and prevent tampering.
            </p>
          </div>
          <div className="feature-card">
            <h3>Risk Analytics</h3>
            <p>
              Monitor transaction risks with real-time analytics and
              intelligent scoring.
            </p>
          </div>
          <div className="feature-card">
            <h3>Audit Trail</h3>
            <p>
              Track every document action with a transparent and secure
              audit history.
            </p>
          </div>

        </div>
      </div>
      <footer className="landing-footer">
        <p>© 2026 Trade Finance Explorer. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default LandingPage;
