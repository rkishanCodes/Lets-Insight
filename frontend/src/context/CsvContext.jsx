import React, { createContext, useState } from "react";

export const CsvContext = createContext();

export const CsvProvider = ({ children }) => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const setCsvDataAndHeaders = (data, headers) => {
    setCsvData(data);
    setHeaders(headers);
  };

  return (
    <CsvContext.Provider value={{ csvData, headers, setCsvDataAndHeaders }}>
      {children}
    </CsvContext.Provider>
  );
};
