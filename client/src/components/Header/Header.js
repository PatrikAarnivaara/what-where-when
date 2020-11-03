import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Switch } from "@material-ui/core/";
import useStyles from "./useStyle";

const Header = ({ changeTheme, darkMode }) => {
  const classes = useStyles();

  const switchTheme = () => {
    changeTheme();
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            WwW
          </Typography>
          <Switch checked={darkMode} onChange={switchTheme} />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
