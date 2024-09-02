import React, { useState } from "react";
import axios from "axios";
import "./pages.css";

const Admin_page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5002/api/v0/admin/", {
        email,
        password,
      });
      if (response.status === 200) {
        console.log(response);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="admin_login">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Admin_page;
