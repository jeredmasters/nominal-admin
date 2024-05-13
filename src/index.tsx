import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./app";
import { ThemeProvider } from "react-admin";
import { theme } from "./theme";
import { AuthProvider } from "./context/auth.provider";
import { LocalStorageProvider } from "./context/localstorage.provider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalStorageProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LocalizationProvider>
      </LocalStorageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
