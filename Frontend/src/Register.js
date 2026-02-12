import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}/>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}/>
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}/>
          <select name="role" onChange={handleChange}>
            <option value="bank">Bank</option>
            <option value="corporate">Corporate</option>
            <option value="auditor">Auditor</option>
            <option value="admin">Admin</option>
          </select>
          <input
            name="org"
            placeholder="Organization Name"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
