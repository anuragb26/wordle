import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Wordle from "./Wordle";
import Layout from "./components/Layout/Layout";
import { ThemeProvider } from "./providers/ThemeProvider";
import { CounterProvider } from "./providers/CounterProvider";

const rootHtml = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootHtml);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CounterProvider>
        <Layout>
          <Wordle />
        </Layout>
      </CounterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
