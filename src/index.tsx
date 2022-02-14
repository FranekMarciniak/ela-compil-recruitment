import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./global.module.css";
import GlobalState from "./context/global/GlobalState";
ReactDOM.render(
  <React.StrictMode>
    <GlobalState>
      <App />
    </GlobalState>
  </React.StrictMode>,
  document.getElementById("root")
);
