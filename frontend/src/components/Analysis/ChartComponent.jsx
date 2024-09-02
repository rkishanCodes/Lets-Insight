import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const chartComponents = {
  "Bar Chart": "bar",
  "Line Chart": "line",
  "Pie Chart": "pie",
  "Radar Chart": "radar",
  "Bubble Chart": "bubble",
  "Doughnut Chart": "doughnut",
  "PolarArea Chart": "polarArea",
};

const ChartComponent = ({ chartType, data, title, xAxisTitle, yAxisTitle }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    let type = chartComponents[chartType];

    // Customization for specific chart types
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

    // Specific customization for Area Chart
    if (chartType === "Area Chart") {
      options = {
        ...options,
        elements: {
          line: {
            fill: true,
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

export default ChartComponent;
