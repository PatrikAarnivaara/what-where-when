import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  /* Switch */
} from "react-router-dom";
import { Switch } from "@material-ui/core/";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
/* import Uploads from "../src/components/Uploads" */
import Header from "../src/components/Header/Header";
import Gallery from "../src/components/Gallery";
import UploadForm from "../src/components/UploadForm";
import ImageList from "../src/components/ImageList";
/* import UserForm from "../src/components/UserForm" */

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header />
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        <UploadForm />
        <ImageList />
      </div>
    </ThemeProvider>
  );
}

export default App;
