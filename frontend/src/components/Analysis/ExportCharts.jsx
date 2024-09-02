import React, { useRef } from "react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ExportCharts = ({ chartRef }) => {
  const exportToPNG = () => {
    html2canvas(chartRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "chart.png");
      });
    });
  };

  const exportToPDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    html2canvas(chartRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("chart.pdf");
    });
  };

  return (
    <div>
      <button onClick={exportToPNG}>Export as PNG</button>
      <button onClick={exportToPDF}>Export as PDF</button>
    </div>
  );
};

export default ExportCharts;
