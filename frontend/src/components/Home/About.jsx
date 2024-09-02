// About.jsx
import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.container} id="About">
      <div className={styles.leftColumn}>
        <h2 className={`${styles.fsSecondaryHeading} ${styles.fwBold}`}>
          Uncover Insights with Let’s Insight
        </h2>
        <p>
          we specialize in transforming raw data into actionable insights. Our
          mission is to empower organizations with robust data analysis tools
          that drive informed decision-making and optimize performance. With a
          focus on clarity and precision, we provide intuitive solutions
          designed to simplify complex data processes. Partner with us to
          uncover the full potential of your data and gain a competitive edge in
          today’s dynamic market.
        </p>
      </div>
      <div className={styles.rightColumn}>
        <iframe
          title="Lottie Animation"
          src="https://lottie.host/embed/6a6084f2-2886-44a6-aafb-48f71346d5d5/YhgnP1YVi4.json"
          width="450" // Set your desired width here, in pixels or percentage
          height="380"
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default About;
