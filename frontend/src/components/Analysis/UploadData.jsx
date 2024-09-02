import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { CsvContext } from "../../context/CsvContext.jsx";
import CsvTable from "./CsvTable.jsx";

const UploadData = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { setCsvDataAndHeaders } = useContext(CsvContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      const rows = text.split("\n");
      const headers = rows[0].split(",");
      const data = rows.slice(1).map((row) => row.split(","));
      dispatch(setCsvDataAndHeaders(data, headers)); // Update context with data and headers
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div>
      <h1>Upload CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {file && <p>Selected file: {file.name}</p>}
      <CsvTable />
    </div>
  );
};

export default UploadData;