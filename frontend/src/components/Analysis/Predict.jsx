// src/components/Predict.jsx
import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

const Predict = ({ model }) => {
  const [inputData, setInputData] = useState("");
  const [prediction, setPrediction] = useState("");

  const handlePredict = () => {
    if (!model || inputData === "") {
      setPrediction(
        "Please ensure that the model is trained and input data is provided."
      );
      return;
    }

    const inputArray = inputData.split(",").map(Number);
    const inputTensor = tf.tensor2d([inputArray]);
    const result = model.predict(inputTensor);
    setPrediction(result.dataSync()[0]);
  };

  return (
    <div>
      <h2>Make Prediction</h2>
      <input
        type="text"
        placeholder="Enter input data (comma-separated)"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button onClick={handlePredict}>Predict</button>
      <p>Prediction: {prediction}</p>
    </div>
  );
};

export default Predict;
