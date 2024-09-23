import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CsvContext } from "../../context/CsvContext.jsx";
import ChartComponent from "./ChartComponent.jsx";
import VisualizationSelector from "./VisualizationSelector.jsx";
import styles from "./DescriptiveAnalysis.module.css";
import {
  setSelectedChart,
  setTitle,
  setXAxis,
  setYAxis,
  setBackgroundColor,
  setBorderColor,
} from "../../redux/slices/descriptiveAnalysisSlice";

const DescriptiveAnalysis = () => {
  const { csvData, headers } = useContext(CsvContext); 
  const dispatch = useDispatch();
  const { selectedChart, title, xAxis, yAxis, backgroundColor, borderColor } =
    useSelector((state) => state.descriptiveAnalysis);

  const handleSelectChart = (chart) => {
    dispatch(setSelectedChart(chart));
  };

  const handleBackgroundColorChange = (e) => {
    dispatch(setBackgroundColor(e.target.value));
  };

  const handleBorderColorChange = (e) => {
    dispatch(setBorderColor(e.target.value));
  };

  const chartData = {
    labels: csvData.map((row) => row[headers.indexOf(xAxis)]),
    datasets: [
      {
        label: yAxis,
        data: csvData.map((row) => row[headers.indexOf(yAxis)]),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.DescriptiveAnalysis}>
      <h1>Descriptive Analysis</h1>
      <div className={styles.Content}>
        <div className={styles.LeftPanel}>
          <div className={styles.VisualizationSelector}>
            <VisualizationSelector onSelect={handleSelectChart} />
            <div className={styles.ColorSelectors}>
              <div>
                <label className={styles.bd}>Background Color:</label>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={handleBackgroundColorChange}
                />
              </div>
              <div>
                <label className={styles.bd}>Border Color:</label>
                <input
                  type="color"
                  value={borderColor}
                  onChange={handleBorderColorChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.RightPanel}>
          <div className={styles.Inputs}>
            <input
              type="text"
              placeholder="Chart Title"
              value={title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
            />
            <select
              value={xAxis}
              onChange={(e) => dispatch(setXAxis(e.target.value))}
            >
              <option value="">Select X Axis</option>
              {headers.map((header, index) => (
                <option key={index} value={header}>
                  {header}
                </option>
              ))}
            </select>
            <select
              value={yAxis}
              onChange={(e) => dispatch(setYAxis(e.target.value))}
            >
              <option value="">Select Y Axis</option>
              {headers.map((header, index) => (
                <option key={index} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
          {selectedChart && (
            <div className={styles.ChartContainer}>
              {title && <h2 className={styles.ChartTitle}>{title}</h2>}
              <ChartComponent
                chartType={selectedChart}
                data={chartData}
                title={title}
                xAxisTitle={xAxis}
                yAxisTitle={yAxis}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DescriptiveAnalysis;
