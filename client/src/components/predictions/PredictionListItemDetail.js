import React from "react";
import { Typography } from "@material-ui/core/";

const PredictionListItemDetail = ({
  predictionDetailData: { url, title, description, date },
}) => {
  return (
    <div>
      <img src={url} alt={title} />
      <Typography>Title: {title}</Typography>
      <Typography>Description: {description}</Typography>
      <Typography>Date: {date}</Typography>
    </div>
  );
};

export default PredictionListItemDetail;
