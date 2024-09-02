import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import { CsvProvider } from "../context/CsvContext";
import HeaderAnalysis from "../components/Header/HeaderAnalysis";

const Analysis = () => {
  return (
    <AuthProvider>
      <CsvProvider>
        <HeaderAnalysis />
        <Outlet />
      </CsvProvider>
    </AuthProvider>
  );
};

export default Analysis;
