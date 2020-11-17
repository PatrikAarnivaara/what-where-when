import React from "react";
import { ButtonGroup, Typography } from "@material-ui/core/";
import DeleteButton from "../../UI/DeleteButton";
import EditButton from "../../UI/EditButton";

const PredictionListItemDetail = ({
  predictionDetailData: { id, url, title, description, date },
}) => {
  return (
    <div>
      <img src={url} alt={title} />
      <Typography>Title: {title}</Typography>
      <Typography>Description: {description}</Typography>
      <Typography>Date: {date}</Typography>
      <Typography>Id: {id}</Typography>
      {/* <ButtonGroup color="secondary" aria-label="outlined primary button group"> */}
        <EditButton />
        <DeleteButton />
      {/* </ButtonGroup> */}
    </div>
  );
};

export default PredictionListItemDetail;
