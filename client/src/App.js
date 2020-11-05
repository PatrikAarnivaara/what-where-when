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
import HeaderTest from "../src/components/Header/HeaderTest";
import Gallery from "../src/components/Gallery";
import UploadForm from "../src/components/UploadForm";
import ImageList from "../src/components/ImageList";
/* import UserForm from "../src/components/UserForm" */

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
        {/* <Header darkMode={darkMode} changeTheme={changeTheme} /> */}
        <HeaderTest darkMode={darkMode} changeTheme={changeTheme}/>
        <UploadForm />
        <ImageList />
      </div>
    </ThemeProvider>
  );
}

export default App;
