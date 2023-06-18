import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="flex flex-col justify-center items-center min-h-screen bg-primary">
      <App />
    </div>
  </React.StrictMode>
);
