// HeaderHome.jsx

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../Theme/ThemeToggle";
import logo from "../../assets/logo2.svg";
import styles from "./HeaderHome.module.css";
import { useAuth } from "../../context/AuthContext.jsx"; // Adjust path as needed

const HeaderHome = () => {
  const { isLoggedIn, logout } = useAuth();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Optional: Fetch user profile or perform any other initialization
  }, []);

  return (
    <nav className={`${styles.nav} ${styles.outline}`}>
      <Link to="/" className={`${styles.logo}`}>
        <img src={logo} alt="Logo" />
      </Link>
      <ul className={styles.menu}>
        <li onClick={() => scrollToSection("Hero")}>Home</li>
        <li onClick={() => scrollToSection("Features")}>Features</li>
        <li onClick={() => scrollToSection("About")}>About</li>
      </ul>
      <ul className={styles.loginList}>
        {isLoggedIn ? (
          <li onClick={logout}>Logout</li>
        ) : (
          <Link to="/login">
            <li>Login</li>
          </Link>
        )}
        <ThemeToggle />
      </ul>
    </nav>
  );
};

export default HeaderHome;
