import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from './context/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
  </ThemeProvider>
);

serviceWorkerRegistration.register();
reportWebVitals();
