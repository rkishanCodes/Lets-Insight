import React, { useContext, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { CsvContext } from "../../context/CsvContext";

const TrainModel = ({
  independentVariables,
  dependentVariable,
  modelType,
  modelConfig,
  setModel,
}) => {
  const [training, setTraining] = useState(false);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const { csvData, headers } = useContext(CsvContext);
  const [evaluationDetails, setEvaluationDetails] = useState(null);

  const handleTrainModel = async () => {
    setTraining(true);

    try {
      const { inputs, labels } = await prepareData(
        csvData,
        headers,
        independentVariables,
        dependentVariable
      );

      if (!inputs || !labels) {
        throw new Error(
          "Data preprocessing failed. Inputs or labels are undefined."
        );
      }

      if (modelType === "linear_regression") {
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 1, inputShape: [inputs.shape[1]] }));
        model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

        await model.fit(inputs, labels, {
          epochs: 100,
          learningRate: modelConfig.learningRate || 0.1,
          callbacks: {
            onEpochEnd: (epoch, logs) => {
              console.log(`Epoch ${epoch}: Loss = ${logs.loss}`);
            },
          },
        });

        setModel(model);
      } else if (modelType === "logistic_regression") {
        const model = tf.sequential();
        model.add(
          tf.layers.dense({
            units: 1,
            inputShape: [inputs.shape[1]],
            activation: "sigmoid",
          })
        );
        model.compile({
          optimizer: "adam",
          loss: "binaryCrossentropy",
          metrics: ["accuracy"],
        });

        const history = await model.fit(inputs, labels, {
          epochs: 50,
          batchSize: 32,
          learningRate: modelConfig.learningRate || 0.01,
          callbacks: {
            onEpochEnd: (epoch, logs) => {
              console.log(`Epoch ${epoch}: Loss = ${logs.loss}`);
            },
          },
        });

        setModel(model);

        const accuracy =
          history && history.history && history.history.acc
            ? history.history.acc[history.epoch.length - 1]
            : null;
        if (accuracy) {
          setEvaluationDetails({
            accuracy: accuracy.toFixed(2),
          });
        }
      }

      console.log("Model training completed!");
      setTrainingComplete(true);
    } catch (error) {
      console.error("Error during model training:", error);
    }
  };

  const prepareData = async (
    csvData,
    headers,
    selectedIndependentVariables,
    selectedDependentVariable
  ) => {
    try {
      const convertedData = await convertCsvToObject(csvData, headers);

      const inputs = [];
      const labels = [];

      convertedData.forEach((row) => {
        const rowInputs = [];
        let isValidRow = true;

        // Process selected independent variables
        selectedIndependentVariables.forEach((variable) => {
          const value = Number(row[variable]);
          if (isNaN(value)) {
            isValidRow = false;
          }
          rowInputs.push(value);
        });

        // Process selected dependent variable
        const rowLabel = Number(row[selectedDependentVariable]);
        if (isNaN(rowLabel)) {
          isValidRow = false;
        }

        if (isValidRow) {
          inputs.push(rowInputs);
          labels.push(rowLabel);
        } else {
          console.warn("Invalid row:", row);
        }
      });

      console.log("Inputs:", inputs);
      console.log("Labels:", labels);

      if (inputs.length === 0 || labels.length === 0) {
        throw new Error("No valid data rows found after preprocessing.");
      }

      const inputsTensor = tf.tensor2d(inputs, [
        inputs.length,
        inputs[0].length,
      ]);
      const labelsTensor = tf.tensor1d(labels);

      return { inputs: inputsTensor, labels: labelsTensor };
    } catch (error) {
      console.error("Error during data preprocessing:", error);
      return { inputs: null, labels: null };
    }
  };

  const convertCsvToObject = async (csvData, headers) => {
    if (!csvData || !headers || csvData.length === 0 || headers.length === 0) {
      return [];
    }

    const convertedData = csvData
      .map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          // Only assign if the value is defined
          if (typeof row[index] !== "undefined") {
            obj[header] = row[index];
          }
        });
        return obj;
      })
      .filter((row) => Object.keys(row).length > 0); // Remove rows where no valid data is found

    return convertedData;
  };

  return (
    <div>
      <h2>Train Model</h2>
      {trainingComplete ? (
        <div>
          <p>Model training complete.</p>
          {evaluationDetails && (
            <p>Model evaluated with accuracy: {evaluationDetails.accuracy}</p>
          )}
        </div>
      ) : (
        <button onClick={handleTrainModel} disabled={training}>
          {training ? "Training..." : "Train"}
        </button>
      )}
    </div>
  );
};

export default TrainModel;
