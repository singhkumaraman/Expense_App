import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GlobalProvider } from "./context/GlobalContext.jsx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <div className="flex flex-col justify-center items-center min-h-screen bg-primary">
        <App />
      </div>
    </GlobalProvider>
  </React.StrictMode>
);
