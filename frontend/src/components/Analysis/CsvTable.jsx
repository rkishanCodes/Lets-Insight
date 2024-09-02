import React, { useContext } from "react";
import { CsvContext } from "../../context/CsvContext.jsx";
import styles from "./CsvTable.module.css"; // Import CSS Module

const CsvTable = () => {
  const { csvData, headers } = useContext(CsvContext);

  return (
    <div className={styles["csv-table-container"]}>
      <h2>CSV Data Table</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CsvTable;
