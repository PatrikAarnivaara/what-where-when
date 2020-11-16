import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  gridListTile: {
    cursor: "pointer",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  subHeader: {
    fontSize: "1.5em",
  },
}));

export default useStyles;
