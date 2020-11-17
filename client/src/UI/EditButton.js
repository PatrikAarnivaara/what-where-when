import React from "react";
import { Button } from "@material-ui/core/";

const EditButton = ({ color }) => {
  return (
    <div>
      <Button variant="outlined" color="secondary">
        EDIT
      </Button>
    </div>
  );
};

export default EditButton;
