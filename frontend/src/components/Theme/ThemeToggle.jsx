import React from "react";
import { useTheme } from "../../context/ThemeContext.jsx";
import light from "../../assets/light3.svg";
import dark from "../../assets/dark.svg";
import styles from "./ThemeToggle.module.css";

console.log(styles);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={styles.theme_switch} onClick={toggleTheme}>
      <img
        className={styles.theme_icon}
        src={theme === "dark" ? light : dark}
        alt="theme"
      />
    </div>
  );
};

export default ThemeToggle;
