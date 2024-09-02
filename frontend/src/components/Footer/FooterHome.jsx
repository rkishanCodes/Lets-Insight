import React from "react";
import styles from "./FooterHome.module.css";

import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";
import youtube from "../../assets/youtube.svg";
import { Link } from "react-router-dom";

const FooterHome = () => {
  const scrollToSection = (id) => {
    console.log(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logo}>
          <Link to="/">
            <h3>Let's Insight</h3>
          </Link>
        </div>
        <nav className={styles.navLinks}>
          <ul>
            <li onClick={() => scrollToSection("Hero")}>Home</li>
            <li onClick={() => scrollToSection("Features")}>Features</li>
            <li onClick={() => scrollToSection("About")}>About</li>
          </ul>
        </nav>
        <div className={styles.socialLinks}>
          <ul>
            <li>
              <img src={twitter} alt="" />
            </li>
            <li>
              <img src={youtube} alt="" />
            </li>
            <li>
              <img src={instagram} alt="" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterHome;
