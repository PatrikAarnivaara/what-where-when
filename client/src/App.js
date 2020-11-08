import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from "react-router-dom";
import { createMuiTheme, ThemeProvider, useMediaQuery } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "../src/components/Header/Header";
import UploadForm from "../src/components/UploadForm";
import PredictionList from "./components/predictions/PredictionList";

function App() {
  /* const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)"); */
  const [darkMode, setDarkMode] = useState(true);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  const changeTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header darkMode={darkMode} changeTheme={changeTheme} />
        <UploadForm />
        <PredictionList />
      </div>
    </ThemeProvider>
  );
}

export default App;
