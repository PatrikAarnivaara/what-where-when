import React, { useEffect, useState } from "react";
import { get, patch } from "axios";
import { Box, FormControl, TextField, Button } from "@material-ui/core/";
import useStyles from "../UploadForm/useStyles";
import { editForm } from "../../api/editForm";

const PredictionEdit = (props) => {
  const classes = useStyles();
  const initialState = { title: "", description: "" };
  const [prediction, setPrediction] = useState(initialState);
  const [file, setFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  

  useEffect(
    function () {
      async function getPrediction() {
        try {
          const response = await get(
            `/api/predictions/${props.match.params._id}`
          );
          setPrediction(response.data);
          setPreviewSource(response.data.url);
        } catch (error) {
          console.log("error", error);
        }
      }
      getPrediction();
    },
    [props]
  );

  const handleInputChange = (e) => {
    e.preventDefault();
    setPrediction({ ...prediction, [e.target.name]: e.target.value });
  };

  const handeFileInputChange = (e) => {
    previewFile(e.target.files[0]);
    setFile(e.target.files[0])
  };

  const previewFile = async (previewSource) => {
    const reader = new FileReader();
    reader.readAsDataURL(previewSource);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadWithJSON = async () => {
    /* const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      }); */

    /* const data = {
      title: title,
      file: await toBase64(file),
      description: description,
      date: new Date().toLocaleString(),
      _id: props.match.params._id,
    }; */

   /*  setPrediction({
      ...prediction,
      file: await toBase64(file),
      date: new Date().toLocaleString(),
    }); */

    /* setPreviewSource(""); */

    /* e.preventDefault(); */

    console.log(prediction._id);
    /* console.log(previewSource); */

    async function updatePrediction() {
      try {
        await patch(`/api/edit/${props.match.params._id}`, prediction);
        props.history.push(`/predictions/`);
      } catch (error) {
        console.log(error);
      }
    }
    updatePrediction();

    /*  editForm("application/json", data, (msg) =>
      console.log("Upload SUBMIT JSON", msg)
    ); */
  };

  const clearFields = () => {
    /* setFile("");
    setPreviewSource("");
    setTitle("");
    setDescription(""); */
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
    previewFile(e.target.files[0]);
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
            id="outlined-basic"
            variant="outlined"
            label="title"
            color="secondary"
            type="text"
            name="title"
            value={prediction.title}
            onChange={handleInputChange}
            className={classes.textFieldTop}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="description"
            color="secondary"
            type="text"
            name="description"
            value={prediction.description}
            onChange={handleInputChange}
            className={classes.textFieldBottom}
          />
          <input
            className={classes.fileUpload}
            type="file"
            name="file"
            onChange={handeFileInputChange}
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
