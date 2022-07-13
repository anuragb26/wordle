import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Router from "./components/Router/Router";
import Layout from "./components/Layout/Layout";
import { ThemeProvider } from "./providers/ThemeProvider";
import { CounterProvider } from "./providers/CounterProvider";

const rootHtml = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootHtml);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CounterProvider>
        <BrowserRouter>
          <Layout>
            <Router />
          </Layout>
        </BrowserRouter>
      </CounterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
