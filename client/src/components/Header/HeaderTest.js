import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { Button, Switch } from "@material-ui/core/";
import useStyles from "./useStyle";

const HeaderTest = ({ changeTheme, darkMode }) => {
  const classes = useStyles();

  const handleClick = (event) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };

  const switchTheme = () => {
    changeTheme();
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/" onClick={handleClick}>
        Images
      </Link>
      <Link
        color="inherit"
        href="/getting-started/installation/"
        onClick={handleClick}
      >
        Core
      </Link>
      <Link
        color="textPrimary"
        href="/components/breadcrumbs/"
        onClick={handleClick}
        aria-current="page"
      >
        Breadcrumb
      </Link>
      <Button onClick={switchTheme}>
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </Button>
    </Breadcrumbs>
  );
};

export default HeaderTest;
