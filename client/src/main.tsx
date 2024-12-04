import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import React from "react";
import AppContextProvider from "./contexts/AppContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
