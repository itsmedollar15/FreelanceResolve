// Importing required modules
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./i18n"; // Import the i18n configuration


// Attaching the React app to the root div
const rootElement = document.getElementById("root");

// Render the application within StrictMode for better debugging and checks
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
