import React, { useContext } from "react";
import { CsvContext } from "../../context/CsvContext";

const CsvToObjectConverter = () => {
  const { csvData, headers } = useContext(CsvContext);

  // Function to convert csvData and headers to objects
  const convertCsvToObject = () => {
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

  return {
    convertCsvToObject,
  };
};

export default CsvToObjectConverter;
