import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import Register from "../pages/Register.jsx";
import Login from "../pages/Login.jsx";
import Analysis from "../pages/Analysis.jsx";
import DescriptiveAnalysis from "../components/Analysis/DescriptiveAnalysis.jsx";
import ExploratoryDataAnalysis from "../components/Analysis/ExploratoryDataAnalysis.jsx";
import Data from "../components/Analysis/Data.jsx";
import Admin_page from "../pages/Admin_page.jsx";
import Admin_dashboard from "../pages/Admin_dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/admin",
    element: <Admin_page />,
    errorElement: <NotFound />,
  },
  {
    path: "/dashboard",
    element: <Admin_dashboard />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <NotFound />,
  },
  {
    path: "/analysis",
    element: <Analysis />,
    errorElement: <NotFound />,
    children: [
      {
        path: "data",
        element: <Data />,
        errorElement: <NotFound />,
      },
      {
        path: "descriptive",
        element: (
          <>
            <DescriptiveAnalysis />
          </>
        ),
        errorElement: <NotFound />,
      },
      {
        path: "eda",
        element: <ExploratoryDataAnalysis />,
        errorElement: <NotFound />,
      },
    ],
  },
]); 




export default router;
