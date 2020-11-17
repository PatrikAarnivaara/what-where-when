import React from "react";
import axios from "axios";
import { Button } from "@material-ui/core/";

const DeleteButton = (props) => {

  console.log(props)

  const handleDelete = async () => {
    try {
      /* await axios.delete("/api/predictions/", { params: { id: id } }); */
      await axios.delete(`/api/predictions/${props.match.params._id}`);
      props.history.push("/predictions");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Button onClick={handleDelete} variant="outlined" color="secondary">
        DELETE
      </Button>
    </div>
  );
};

export default DeleteButton;
