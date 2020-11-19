import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core/";
import { Link } from "react-router-dom";
import DeleteButton from "../../UI/DeleteButton";
import EditButton from "../../UI/EditButton"

const PredictionInfo = (props) => {
  const [prediction, setPrediction] = useState({});

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

  return (
    <div>
      <img
        src={prediction.url}
        alt={prediction.title}
        style={{ width: "300px" }}
      />
      <Typography>{prediction.title}</Typography>
      <Typography>Description: {prediction.description}</Typography>
      <Typography>Date: {prediction.date}</Typography>
      <DeleteButton {...props}/>
      <EditButton id={prediction._id}/>
    </div>
  );
};

export default PredictionInfo;
