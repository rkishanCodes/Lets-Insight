import React, { useState } from "react";
import Bar from "../../assets/Bar.svg";
import Line from "../../assets/line.svg";
import Pie from "../../assets/pie.svg";
import Radar from "../../assets/radar.svg";
import Bubble from "../../assets/bubble.svg";
import Doughnut from "../../assets/doughnut.svg";
import Ploarbearchart from "../../assets/ploarbearchart.svg";

import styles from "./VisualizationSelector.module.css";

const chartData = [
  { src: Bar, alt: "Bar Chart", title: "Bar Chart" },
  { src: Line, alt: "Line Chart", title: "Line Chart" },
  { src: Pie, alt: "Pie Chart", title: "Pie Chart" },
  { src: Radar, alt: "Radar Chart", title: "Radar Chart" },
  { src: Bubble, alt: "Bubble Chart", title: "Bubble Chart" },
  { src: Doughnut, alt: "Doughnut Chart", title: "Doughnut Chart" },
  { src: Ploarbearchart, alt: "Ploarbear Chart", title: "PolarArea Chart" },
];

const VisualizationSelector = ({ onSelect }) => {
  return (
    <div className={styles.ChartsContainer}>
      {chartData.map((chart, index) => (
        <img
          key={index}
          src={chart.src}
          alt={chart.alt}
          title={chart.title}
          onClick={() => onSelect(chart.title)}
        />
      ))}
    </div>
  );
};

export default VisualizationSelector;
