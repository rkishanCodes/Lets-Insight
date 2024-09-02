import React from "react";
import styles from "./Features.module.css";
import logo from "../../assets/hero_section.png";
const Features = () => {
  return (
    <div className={styles.container}id="Features">
      <div className={styles.evenColumns}>
        <div className={styles.textAlignSmOnly}>
          <h2 className={`${styles.fsSecondaryHeading} ${styles.fwBold}`}>
            What's different about us?
          </h2>
          <p>
            Let's Insight provides all the tools your team needs for
            comprehensive data analysis, without the complexity. Our platform is
            designed for modern data-driven teams.
          </p>
          <img src={logo} alt="" />
        </div>
        <div>
          <ul className={`${styles.numberedItems} ${styles.flow}`} role="list">
            <li>
              <div className={styles.flow} style={{ "--flow-spacer": "1em" }}>
                <h3 className={`${styles.numberedItemsTitle} ${styles.fwBold}`}>
                  Comprehensive Data Visualization
                </h3>
                <p className={styles.numberedItemsBody}>
                  Visualize your data with customizable charts and dashboards.
                  Track key metrics and uncover insights at a glance.
                </p>
              </div>
            </li>
            <li>
              <div className={styles.flow} style={{ "--flow-spacer": "1em" }}>
                <h3 className={`${styles.numberedItemsTitle} ${styles.fwBold}`}>
                  Advanced Analytical Tools
                </h3>
                <p className={styles.numberedItemsBody}>
                  Leverage built-in analytical tools to perform complex
                  analyses. From statistical analysis to machine learning, Let's
                  Insight has you covered.
                </p>
              </div>
            </li>
            <li>
              <div className={styles.flow} style={{ "--flow-spacer": "1em" }}>
                <h3 className={`${styles.numberedItemsTitle} ${styles.fwBold}`}>
                  Secure Data Handling
                </h3>
                <p className={styles.numberedItemsBody}>
                  Ensure data security and compliance with robust encryption and
                  access controls. Safeguard sensitive information while
                  maintaining regulatory standards for peace of mind and
                  trustworthiness.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Features;
