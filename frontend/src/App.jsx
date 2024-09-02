import React from "react";
import { Outlet, RouterProvider } from "react-router-dom";
import router from "./routes/route.jsx";
import "./styles/base/reset.css";
import "./styles/base/typography.css";
import "./styles/global.css";
import ThemeProvider from "./context/ThemeContext.jsx";

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
