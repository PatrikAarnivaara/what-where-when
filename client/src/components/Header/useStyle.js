import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "8vh",
    width: "100%",
    /* position: "fixed", */

    boxShadow: "0px 10px 24px 0px rgba(0,0,0,0.25)",
    top: 0,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    opacity: "0.9",
  },
  border: {
    borderColor: "red",
  },
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
    color: "#ff9800",
  },
  login: {
    position: "absolute",
    left: "calc(5% - 3rem)",
    top: "calc(5% - 1.5rem)",
  },
  mode: {
    position: "absolute",
    right: "calc(5% - 3rem)",
    top: "calc(5% - 1.5rem)",
  },
}));

export default useStyles;
