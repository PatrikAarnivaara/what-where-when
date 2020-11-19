import React, { useState } from "react";
/* import Link from "@material-ui/core/Link"; */
import { Link } from "react-router-dom";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import CropLandscapeIcon from "@material-ui/icons/CropLandscape";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { Button, Box, Typography } from "@material-ui/core/";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import useStyles from "./useStyles";

const HeaderTest = ({ changeTheme, darkMode }) => {
  const classes = useStyles();

  const [login, setLogin] = useState(false);

  /* const handleClick = (event) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }; */

  const switchTheme = () => {
    changeTheme();
  };

  return (
    <Box className={classes.root}>
      <Button
        className={classes.login}
        onClick={() => {
          setLogin(!login);
        }}
      >
        {login ? <LockIcon /> : <LockOpenIcon />}
      </Button>
      {/* <Box className={classes.linkWrapper}> */}
      <Button>
        <Link to="/" className={classes.link}>
          <VisibilityIcon />
        </Link>
      </Button>
      <Button>
        <Link to="/predictions" className={classes.link}>
          <PhotoLibraryIcon />
        </Link>
      </Button>
      {/* </Box> */}
      <Button className={classes.mode} onClick={switchTheme}>
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </Button>
    </Box>
  );
};

export default HeaderTest;
