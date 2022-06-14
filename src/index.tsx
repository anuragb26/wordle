import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Wordle from "./Wordle";
import { ThemeProvider } from "./providers/ThemeProvider";

const rootHtml = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootHtml);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Wordle />
    </ThemeProvider>
  </React.StrictMode>
);
