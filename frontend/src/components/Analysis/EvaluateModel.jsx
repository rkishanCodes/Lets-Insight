import React, { useState, useContext } from "react";
import * as tf from "@tensorflow/tfjs";
import { CsvContext } from "../../context/CsvContext";

const EvaluateModel = ({ model }) => {
  const [evaluation, setEvaluation] = useState("");
  const { csvData, headers } = useContext(CsvContext);

  const handleEvaluateModel = async () => {
    if (!model || !csvData || !headers) {
      setEvaluation(
        "Please ensure that the model is trained and data is available."
      );
      return;
    }

    const { inputs, labels } = prepareData(csvData, headers);
    const results = model.evaluate(inputs, labels);
    setEvaluation(`Loss: ${results.dataSync()[0]}`);
  };

  const prepareData = (csvData, headers) => {
    // Convert CSV data to objects
    const convertedData = convertCsvToObject(csvData, headers);

    // Initialize arrays for inputs and labels
    const inputs = [];
    const labels = [];

    // Preprocess each row of data
    convertedData.forEach((row) => {
      const rowInputs = [];
      let isValidRow = true;

      headers.forEach((header) => {
        const value = Number(row[header]);
        if (isNaN(value)) {
          isValidRow = false;
        }
        rowInputs.push(value);
      });

      const rowLabel = Number(row[headers[headers.length - 1]]);
      if (isNaN(rowLabel)) {
        isValidRow = false;
      }

      // Check if all inputs are numbers and label is a number
      if (isValidRow) {
        inputs.push(rowInputs);
        labels.push(rowLabel);
      } else {
        console.warn("Invalid row:", row);
      }
    });

    // Convert inputs and labels to TensorFlow tensors
    const inputsTensor = tf.tensor2d(inputs);
    const labelsTensor = tf.tensor1d(labels);

    return { inputs: inputsTensor, labels: labelsTensor };
  };

  const convertCsvToObject = (csvData, headers) => {
    if (!csvData || !headers || csvData.length === 0 || headers.length === 0) {
      return [];
    }

    const convertedData = csvData.map((row) => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });
      return obj;
    });

    return convertedData;
  };

  return (
    <div>
      <h2>Evaluate Model</h2>
      <button onClick={handleEvaluateModel}>Evaluate</button>
      <p>{evaluation}</p>
    </div>
  );
};

export default EvaluateModel;
