import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import logo from "../assets/logo2.svg";
import googleIcon from "../assets/google.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/analysis/data");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both email and password fields are filled
    if (!formData.email || !formData.password) {
      setError("Both fields are required.");
      return; // Stop further execution if fields are empty
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v0/auth/login`,
        formData
      );
      localStorage.setItem("token", response.data.token);
      navigate("/analysis/data");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_API_BASE_URL
    }/api/v0/auth/google/login`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const exists = params.get("exists");


    if (token) {
      localStorage.setItem("token", token);
      navigate("/analysis/data");
    }

    if (exists === "false") {
      setNotification("Account does not exist. Please register.");
    }
  }, [navigate]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {notification && (
          <div className={styles.notification}>{notification}</div>
        )}
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.row}>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </Link>
          <button className={styles.googleLogin} onClick={handleGoogleLogin}>
            <img src={googleIcon} alt="Google" className={styles.googleIcon} />
            Login with Google
          </button>
        </div>
        <div className={styles.row}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <input
              type="text"
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
              Login
            </button>
          </form>
        </div>
        <Link to="/register" className={styles.registerLink}>
          Create an account <span>Register</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
