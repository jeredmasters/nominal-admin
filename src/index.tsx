import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./app";
import { ThemeProvider } from "react-admin";
import { theme } from "./app/theme";
import { AuthProvider } from "./context/auth.provider";
import { LocalStorageProvider } from "./context/localstorage.provider";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalStorageProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </LocalStorageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
