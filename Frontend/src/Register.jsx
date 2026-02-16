import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "./api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "bank",
    org: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.org) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        org_name: form.org,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}/>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}/>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}/>
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="bank">Bank</option>
            <option value="corporate">Corporate</option>
            <option value="auditor">Auditor</option>
            <option value="admin">Admin</option>
          </select>
          <input
            name="org"
            placeholder="Organization Name"
            value={form.org}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        {error && <p>{error}</p>}
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
