import React from "react";
import { Avatar, /* CircularProgress */ } from "@material-ui/core/";

const PredictionListItemDetail = ({
  chatContent: { avatar, userName, chat /* online */ },
}) => {
  return (
    <div>
      {avatar && <Avatar src={avatar} alt={userName} /> /* : <CircularProgress /> */}
      <h1>{userName}</h1>
      <p>{chat}</p>
      {/* <h2>{online}</h2> */}
    </div>
  );
};

export default PredictionListItemDetail;
