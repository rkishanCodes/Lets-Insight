import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ThemeToggle from "../Theme/ThemeToggle";
import logo from "../../assets/logo2.svg";
import profile from "../../assets/profile.svg";
import styles from "./HeaderAnalysis.module.css";
import { useAuth } from "../../context/AuthContext.jsx"; // Adjust path as needed

const HeaderAnalysis = () => {
  const { isLoggedIn, logout, fetchUserProfile, profileInfo } = useAuth();
  const [activeItem, setActiveItem] = useState("data");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const { section } = useParams();

  useEffect(() => {
    if (section) {
      setActiveItem(section);
    }
  }, [section]);

  const headerNavigate = (path) => {
    setActiveItem(path);
    navigate(`/analysis/${path}`);
  };

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Logo" />
      </Link>
      <ul className={styles.menu}>
        <li
          className={activeItem === "data" ? styles.active : ""}
          onClick={() => headerNavigate("data")}
        >
          DATA
        </li>
        <li
          className={activeItem === "descriptive" ? styles.active : ""}
          onClick={() => headerNavigate("descriptive")}
        >
          DESCRIPTIVE
        </li>
        <li
          className={activeItem === "eda" ? styles.active : ""}
          onClick={() => headerNavigate("eda")}
        >
          EDA
        </li>
      </ul>
      <ul className={styles.profilelist}>
        <li onClick={() => setDropdownVisible(!dropdownVisible)}>
          <img src={profile} alt="Profile" />
          {dropdownVisible && (
            <div className={styles.dropdown}>
              {profileInfo && <p>{profileInfo.name}</p>}
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </li>
        <ThemeToggle />
      </ul>
    </nav>
  );
};

export default HeaderAnalysis;
