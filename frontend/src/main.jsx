import React from "react";
import { createRoot } from "react-dom/client"; // Updated import for React 18
import { Provider } from "react-redux";
import store from "./redux/store.js";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container); // Create root using the new API

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
