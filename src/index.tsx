import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Router from "./components/Router/Router";
import Layout from "./components/Layout/Layout";
import { ThemeProvider } from "./providers/ThemeProvider";
import { CounterProvider } from "./providers/CounterProvider";
import { DefaultThemeProvider } from "./providers/DefaultThemeProvider";
import { AuthProvider } from "./providers/AuthProvider";

const rootHtml = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootHtml);

root.render(
  <React.StrictMode>
    <DefaultThemeProvider>
      <ThemeProvider>
        <CounterProvider>
          <AuthProvider>
            <BrowserRouter>
              <Layout>
                <Router />
              </Layout>
            </BrowserRouter>
          </AuthProvider>
        </CounterProvider>
      </ThemeProvider>
    </DefaultThemeProvider>
  </React.StrictMode>
);
