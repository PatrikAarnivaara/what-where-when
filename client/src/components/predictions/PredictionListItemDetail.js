import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core/";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

const PredictionListItemDetail = ({
  predictionDetailData: { _id, url, title, description, date },
}) => {
  console.log(_id);

  return (
    <div>
      <img src={url} alt={title} />
      <Typography>Title: {title}</Typography>
      <Typography>Description: {description}</Typography>
      <Typography>Date: {date}</Typography>
      <Typography>Id: {_id}</Typography>
      <Link to={`/predictions/${_id}`}>
        <EditOutlinedIcon style={{ cursor: "pointer" }} />
      </Link>
    </div>
  );
};

export default PredictionListItemDetail;
