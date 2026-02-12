import React from "react";
import Layout from "../Components/layout/Layout";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <Layout>
      <div className="dashboard">
        <h1>Trade Finance Dashboard</h1>
        <Link to="/upload" className="upload-btn">
          Upload Document
        </Link>
      </div>
    </Layout>
  );
}

export default Dashboard;
