import React from "react";
import Histogram from "../../assets/Histogram.svg";
import ScatterPlot from "../../assets/ScatterPlot.svg";
import styles from "./VisualizationSelector.module.css";

const chartData = [
  { src: Histogram, alt: "Histogram", title: "Histogram" },
  { src: ScatterPlot, alt: "Scatter Plot", title: "Scatter Plot" },
];

const VisualizationSelectorEDA = ({ onSelect }) => {
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

export default VisualizationSelectorEDA;
