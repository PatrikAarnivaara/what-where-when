import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  /* NavLink, */
  Switch,
} from "react-router-dom";
import {
  createMuiTheme,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./components/containers/Header/Header";
import LandingPage from "./components/pages/LandingPage/LandingPage";
import UploadForm from "./components/UploadForm/UploadForm";
import Prediction from "./components/predictions/Prediction";

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
        <Router>
          <Header darkMode={darkMode} changeTheme={changeTheme} />
          <Switch>
          <Route exact path="/" component={LandingPage} />
            <Route exact path="/upload" component={UploadForm} />
            <Route exact path="/predictions" component={Prediction} />
          </Switch>
        </Router>
      </div>
      <p>FOOTER</p>
    </ThemeProvider>
  );
}

export default App;
