import React from "react";
import { Button } from "@material-ui/core/";
import { Link } from "react-router-dom";

const EditButton = ({ id }) => {
  return (
    <React.Fragment>
      <Button variant="outlined" >
        <Link to={`/predictions/${id}/edit`} style={{textDecoration: "none"}}>EDIT</Link>
      </Button>
    </React.Fragment>
  );
};

export default EditButton;
