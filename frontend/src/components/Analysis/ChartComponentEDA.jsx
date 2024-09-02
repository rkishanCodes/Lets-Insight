import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const chartComponentsEDA = {
  Histogram: "bar",
  "Scatter Plot": "scatter",
};

const ChartComponentEDA = ({
  chartType,
  data,
  title,
  xAxisTitle,
  yAxisTitle,
}) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    let type = chartComponentsEDA[chartType];

    if (!type) {
      console.error(
        `Chart type '${chartType}' not found in chartComponentsEDA.`
      );
      return;
    }

    console.log("Creating chart of type:", type);

    // Default options
    let options = {
      plugins: {
        title: {
          display: true,
          text: title,
        },
        tooltip: {
          enabled: true,
        },
        legend: {
          display: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: xAxisTitle,
          },
        },
        y: {
          title: {
            display: true,
            text: yAxisTitle,
          },
        },
      },
    };

    // Additional options for specific chart types
    if (chartType === "Histogram") {
      options = {
        ...options,
        indexAxis: "x", // For vertical bars
        scales: {
          x: {
            title: {
              display: true,
              text: xAxisTitle,
            },
          },
          y: {
            title: {
              display: true,
              text: yAxisTitle,
            },
          },
        },
      };
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: type,
      data: data,
      options: options,
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, title, xAxisTitle, yAxisTitle, chartType]);

  return <canvas ref={chartRef}></canvas>;
};

export default ChartComponentEDA;
