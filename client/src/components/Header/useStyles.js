import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "4em",
    maxHeight: "4em",
    width: "100%",
    boxShadow: "0px 10px 24px 0px rgba(0,0,0,0.25)",
    top: 0,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    opacity: "1",
  },
  border: {
    borderColor: "red",
  },
  link: {
    display: "flex",
    fontSize: "1.5em",
    color: "#f50057"
    
  },
  linkWrapper: {
    /* position: "absolute",
    top: "calc(5% - 1.5rem)", */
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    /* alignContent: "center",
    justifyContent: "space-between" */
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
    color: "#ffffff",
    fontSize: "1.5em",
  },
  login: {
    /* flexGrow: "1" */
  },
  mode: {
    
    /* position: "absolute",
    right: "calc(5% - 3rem)",
    top: "calc(5% - 1.5rem)", */
  },
}));

export default useStyles;
