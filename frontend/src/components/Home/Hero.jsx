import React, { useEffect, useRef } from "react";
import styles from "./Hero.module.css";
import { Link } from "react-router-dom";

import floatingLeft1 from "../../assets/floatingLeft1.svg";
import floatingLeft2 from "../../assets/floatingLeft2.svg";
import floatingLeft3 from "../../assets/floatingLeft3.svg";
import floatingRight1 from "../../assets/floatingRight1.svg";
import floatingRight2 from "../../assets/floatingRight2.svg";
import floatingRight3 from "../../assets/floatingRight3.svg";


import { useAuth } from "../../context/AuthContext";


const Hero = () => {
  const floatingLeftRef = useRef(null);
  const floatingRightRef = useRef(null);

  const { profileInfo } = useAuth(); 
  console.log(profileInfo);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const scrollFactor = 0.2;

      const floatingLeft = floatingLeftRef.current;
      if (floatingLeft) {
        const newXLeft = -scrollTop * scrollFactor;
        floatingLeft.style.left = `${newXLeft}px`;
      }

      const floatingRight = floatingRightRef.current;
      if (floatingRight) {
        const newXRight = scrollTop * scrollFactor;
        floatingRight.style.right = `${-newXRight}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={styles.heroSection} id="Hero">
      <div className={styles.floatingLeft} ref={floatingLeftRef}>
        <div className={styles.floatingLeft1}>
          <img src={floatingLeft1} alt="pic" />
        </div>
        <div className={styles.floatingLeft2}>
          <img src={floatingLeft2} alt="" />
        </div>
        <div className={styles.floatingLeft3}>
          <img src={floatingLeft3} alt="" />
        </div>
      </div>
      <div className={styles.container}>
        <span className={styles.heading}>
          Unlock <span className={styles.blue}>Powerful</span>
        </span>
        <span className={styles.heading}>Data Insights</span>
        <p className={styles.desc}>
          Empower businesses with insights. Simplify data analysis. Visualize
          your data.
        </p>
        <button className={styles.CTA}>
          <Link to={profileInfo ? "/analysis" : "/login"}>
            {profileInfo ? "Continue Analysis" : "Get Started"}
          </Link>
        </button>
        <p className={styles.free}>Free and easy!</p>
      </div>
      <div className={styles.floatingRight} ref={floatingRightRef}>
        <div className={styles.floatingRight1}>
          <img src={floatingRight1} alt="pic" />
        </div>
        <div className={styles.floatingRight2}>
          <img src={floatingRight2} alt="" />
        </div>
        <div className={styles.floatingRight3}>
          <img src={floatingRight3} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
