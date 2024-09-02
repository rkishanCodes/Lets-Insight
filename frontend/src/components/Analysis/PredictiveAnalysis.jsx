import React, { useState, useContext } from "react";
import ModelSelection from "./ModelSelection";
import EvaluateModel from "./EvaluateModel";
import Predict from "./Predict";
import ModelPerformanceGraph from "./ModelPerformanceGraph";
import TrainModel from "./TrainModel"; // Import TrainModel component
import styles from "./PredictiveAnalysis.module.css"; // Import CSS module
import { CsvContext } from "../../context/CsvContext";

const PredictiveAnalysis = () => {
  const { headers } = useContext(CsvContext); // Assuming headers are available in context
  const [modelType, setModelType] = useState("");
  const [model, setModel] = useState(null);
  const [selectedIndependentVariables, setSelectedIndependentVariables] =
    useState([]);
  const [selectedDependentVariable, setSelectedDependentVariable] =
    useState("");
  const [trainingStarted, setTrainingStarted] = useState(false);

  // Function to handle selection of independent variables
  const handleIndependentVariableChange = (header) => {
    if (selectedIndependentVariables.includes(header)) {
      setSelectedIndependentVariables(
        selectedIndependentVariables.filter((item) => item !== header)
      );
    } else {
      setSelectedIndependentVariables([
        ...selectedIndependentVariables,
        header,
      ]);
    }
  };

  // Function to handle selection of dependent variable
  const handleDependentVariableChange = (event) => {
    setSelectedDependentVariable(event.target.value);
  };

  // Function to handle starting model training
  const handleStartTraining = () => {
    setTrainingStarted(true); // Update state to indicate training has started
  };

  // Function to handle completion of model training
  const handleCompleteTraining = (trainedModel) => {
    setModel(trainedModel); // Set trained model to state
    setTrainingStarted(false); // Reset training state
  };

  return (
    <div className={styles["predictive-analysis-container"]}>
      <div className={styles["left-panel"]}>
        <h2 className={styles.heading}>Prediction Options</h2>
        <ModelSelection setModelType={setModelType} />
        <div>
          <h3>Select Independent Variables:</h3>
          {headers.map((header) => (
            <div key={header}>
              <input
                type="checkbox"
                id={header}
                checked={selectedIndependentVariables.includes(header)}
                onChange={() => handleIndependentVariableChange(header)}
              />
              <label htmlFor={header}>{header}</label>
            </div>
          ))}
        </div>
        <div>
          <h3>Select Dependent Variable:</h3>
          <select
            value={selectedDependentVariable}
            onChange={handleDependentVariableChange}
          >
            <option value="">Select...</option>
            {headers.map((header) => (
              <option key={header} value={header}>
                {header}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleStartTraining} disabled={trainingStarted}>
          Train Model
        </button>
        {trainingStarted && (
          <TrainModel
            independentVariables={selectedIndependentVariables}
            dependentVariable={selectedDependentVariable}
            modelType={modelType}
            modelConfig={{
              learningRate: modelType === "linear_regression" ? 0.1 : 0.01,
            }}
            setModel={handleCompleteTraining}
          />
        )}
      </div>
      <div className={styles["right-panel"]}>
        <h2 className={styles.heading}>Prediction Results</h2>
        <div className={styles["prediction-values"]}>
          <EvaluateModel
            model={model}
            independentVariables={selectedIndependentVariables}
            dependentVariable={selectedDependentVariable}
          />
          <Predict
            model={model}
            independentVariables={selectedIndependentVariables}
            dependentVariable={selectedDependentVariable}
          />
        </div>
        <div className={styles["model-performance"]}>
          <h2 className={styles.heading}>Model Performance</h2>
          <ModelPerformanceGraph />
        </div>
      </div>
      {/* Conditionally render TrainModel component when trainingStarted is true */}
    </div>
  );
};

export default PredictiveAnalysis;
