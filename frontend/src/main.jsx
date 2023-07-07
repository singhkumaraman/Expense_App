import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GlobalProvider } from "./context/GlobalContext.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <div className="bg-gray-900">
        <App />
      </div>
    </GlobalProvider>
  </React.StrictMode>
);
