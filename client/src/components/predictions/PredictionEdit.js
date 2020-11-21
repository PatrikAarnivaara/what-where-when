import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, FormControl, TextField, Button } from "@material-ui/core/";
import useStyles from "../UploadForm/useStyles";
import { editForm } from "../../api/editForm";

const PredictionEdit = (props) => {
  const classes = useStyles();
  /* const initialState = { title: "", description: "", file: "" };
  { initialState } */
  const [prediction, setPrediction] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [previewSource, setPreviewSource] = useState(prediction.url);

  useEffect(
    function () {
      async function getPrediction() {
        try {
          const response = await axios.get(
            `/api/predictions/${props.match.params._id}`
          );
          setPrediction(response.data);
        } catch (error) {
          console.log("error", error);
        }
      }
      getPrediction();
    },
    [props]
  );

  const handleFileInputChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    previewFile(e.target.files[0]);
  };

  const previewFile = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  /* kanske måste skicka in previewSource här? */
  const uploadWithJSON = async () => {
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const data = {
      title: title,
      file: await toBase64(file),
      description: description,
      date: new Date().toLocaleString(),
      _id: props.match.params._id
    };
    /* Clear up more fields? */
    setPreviewSource("");
    /* Try/Catch, add Spinner? */
    editForm("application/json", data, (msg) =>
      console.log("Upload SUBMIT JSON", msg)
    );
  };

  const clearFields = () => {
    setFile("");
    setPreviewSource("");
    setTitle("");
    setDescription("");
  };

  /* function handleSubmit(event) {
    event.preventDefault();
    async function updateArticle() {
      try {
        await patch(`/api/articles/${article._id}`, article);
        props.history.push(`/articles/${article._id}`);        
      } catch(error) {
        console.log(error);
      }
    }
    updateArticle();
  }

  function handleChange(event) {
    setArticle({...article, [event.target.name]: event.target.value})
  }

  function handleCancel() {
    props.history.push(`/articles/${article._id}`);
  } */

  return (
    <Box className={classes.root}>
      <Box className={classes.box}>
        <Box className={classes.previewContainer}>
          {previewSource && (
            <img src={previewSource} alt="chosen" className={classes.preview} />
          )}
        </Box>
        <form>
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            label={prediction.title}
            color="secondary"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className={classes.textFieldTop}
          />
          <TextField
            required
            id="outlined-basic"
            variant="outlined"
            label={prediction.description}
            color="secondary"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={classes.textFieldBottom}
          />
          <input
            className={classes.fileUpload}
            type="file"
            name="file"
            onChange={handleFileInputChange}
          />
          <Box className={classes.buttonWrap}>
            <Button
              variant="outlined"
              color="secondary"
              type="button"
              value="Upload"
              onClick={uploadWithJSON}
            >
              UPLOAD
            </Button>
            <Button variant="outlined" onClick={clearFields}>
              CLEAR
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default PredictionEdit;
