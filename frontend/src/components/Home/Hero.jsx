import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import styles from "./Hero.module.css";

import floatingLeft1 from "../../assets/floatingLeft1.svg";
import floatingLeft2 from "../../assets/floatingLeft2.svg";
import floatingLeft3 from "../../assets/floatingLeft3.svg";
import floatingRight1 from "../../assets/floatingRight1.svg";
import floatingRight2 from "../../assets/floatingRight2.svg";
import floatingRight3 from "../../assets/floatingRight3.svg";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const floatingLeftRef = useRef(null);
  const floatingRightRef = useRef(null);
  const { profileInfo } = useAuth();

  useEffect(() => {
    const floatingLeft = floatingLeftRef.current;
    const floatingRight = floatingRightRef.current;

    gsap.to(floatingLeft, {
      x: (index, target) => -target.offsetWidth * 0.7,
      ease: "none",
      scrollTrigger: {
        trigger: floatingLeft,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(floatingRight, {
      x: (index, target) => target.offsetWidth * 0.7,
      ease: "none",
      scrollTrigger: {
        trigger: floatingRight,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
