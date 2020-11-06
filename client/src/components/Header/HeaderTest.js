import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import CropLandscapeIcon from "@material-ui/icons/CropLandscape";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { Button, Box, Typography } from "@material-ui/core/";
import VisibilityIcon from '@material-ui/icons/Visibility';
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
    <Breadcrumbs aria-label="breadcrumb" className={classes.root}>
      <Link
        color="inherit"
        href="/"
        onClick={handleClick}
        className={classes.link}
      >
        <VisibilityIcon className={classes.icon} />
        Predict
      </Link>
      {/* <Link
        color="inherit"
        href="/getting-started/installation/"
        onClick={handleClick}
        className={classes.link}
      >
        <TrackChangesIcon className={classes.icon} />
        Core
      </Link> */}
      <Link
        color="inherit"
        href="/getting-started/installation/"
        onClick={handleClick}
        className={classes.link}
      >
        {/* <Typography color="textPrimary" className={classes.link}> */}
          <CropLandscapeIcon className={classes.icon} />
          Images
        {/* </Typography> */}
      </Link>
      <Box>
        <Button onClick={switchTheme}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </Button>
        {/* <Box borderBottom={1} className={classes.border} /> */}
      </Box>
    </Breadcrumbs>
  );
};

export default HeaderTest;
