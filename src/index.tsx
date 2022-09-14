import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { APIMethod } from "./api";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App apiMethod={APIMethod.PYODIDE} />
  </React.StrictMode>
);
