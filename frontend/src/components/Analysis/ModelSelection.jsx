// src/components/ModelSelection.jsx
import React, { useState } from "react";

const ModelSelection = ({ setModelType, setModelConfig }) => {
  const [selectedModel, setSelectedModel] = useState("");

  const handleModelChange = (event) => {
    const modelType = event.target.value;
    setSelectedModel(modelType);
    setModelType(modelType);
  };

  return (
    <div>
      <h2>Select Model</h2>
      <select value={selectedModel} onChange={handleModelChange}>
        <option value="">Select a model</option>
        <option value="linear_regression">Linear Regression</option>
        <option value="logistic_regression">Logistic Regression</option>
        {/* Add more model options as needed */}
      </select>
    </div>
  );
};

export default ModelSelection;
