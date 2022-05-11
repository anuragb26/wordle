import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Wordle from "./Wordle";
import { ThemeProvider } from "./providers/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Wordle />
    </ThemeProvider>
  </React.StrictMode>
);
