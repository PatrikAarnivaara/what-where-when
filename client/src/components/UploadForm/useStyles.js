import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    marginTop: "10vh",
    /* alignItems: "center", */
  },
  box: {
    width: "30vw",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  previewContainer: {
    position: "relative",
    overflow: "hidden",
    width: "50%"
  },
  preview: {
    justifyContent: "center",
    position: "relative",
    width: "100%",
  },
  textFieldTop: {
    marginTop: "2vh",
    marginBottom: "4vh",
    width: "30vw"
  },
  textFieldBottom: {
    marginBottom: "4vh",
  },
  fileUpload: {
    marginBottom: "4vh",
  },
  buttonWrap: {
    display: "flex",
    justifyContent: "space-between",
  },
  predictionsLabel: {
    marginTop: "1em",
    marginBottom: "1em",
    fontSize: "1rem",
    color: "gray"
  }
}));

export default useStyles;
