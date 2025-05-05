import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { customTheme } from "./theme";
import { Dashboard } from "./layout";
import SnackbarProvider from "./contexts/SnackbarProvider/SnackbarProvider";
import apolloClient from "./lib/apollo-client";
import "./style.css";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <CssBaseline />
        <ThemeProvider theme={customTheme}>
          <SnackbarProvider>
            <Dashboard />
          </SnackbarProvider>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
