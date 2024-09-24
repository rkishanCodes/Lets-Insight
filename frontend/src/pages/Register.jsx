import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import logo from "../assets/logo2.svg";
import googleIcon from "../assets/google.svg";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Parse URL parameters to check if 'exists=true'
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("exists") === "true") {
      setError("User already registered");
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v0/auth/register`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      navigate("/analysis/data");
    } catch (error) {
      setError("Registration failed");
    }
  };

  const handleRegisterGoogle = () => {
    window.location.href = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/v0/auth/google/register`;
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.row}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <button className={styles.googleLogin} onClick={handleRegisterGoogle}>
            <img src={googleIcon} alt="Google" className={styles.googleIcon} />
            Register with Google
          </button>
        </div>
        <div className={styles.row}>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className={styles.input}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit" className={styles.submitButton}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
