import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    minHeight: "120vh",
    marginTop: "10vh",
    marginBottom: "10vh"
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
  uploadTextInputAndBackspaceiconWrapper: {
    display: "flex",
    alignItems: "center",
    marginTop: "1em"
  },
  uploadTextField: {
    width: "30vw"
  },
  BackspaceIcon: {
    marginLeft: "1em",
    cursor: "pointer"
  },
  uploadFileZoneWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1em",
    marginBottom: "2em",
  },
  fileUpload: {
    marginBottom: "4vh",
    display: 'none',
    fontSize: "large"
  },
  uploadButtonWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default useStyles;
