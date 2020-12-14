import React from "react";
import { GridListTile, GridListTileBar, Typography } from "@material-ui/core/";
/* import ListSubheader from "@material-ui/core/ListSubheader"; */
import IconButton from "@material-ui/core/IconButton";
import useStyles from "./useStyles";
import InfoIcon from "@material-ui/icons/Info";
import { Image } from "cloudinary-react";

const PredictionListItem = ({
  index,
  id,
  url,
  title,
  description,
  probability,
  date,
  showPredictionDetail,
}) => {
  const classes = useStyles();

  const handleOnClickItem = () => {
    showPredictionDetail(id, url, title, description, probability, date);
  };

  return (
    <GridListTile
      className={classes.gridListTile}
      onClick={handleOnClickItem}
      cols={3}
    >
      <Image
        key={index}
        cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
        publicId={url}
        width="180"
        crop="scale"
        quality="auto"
      />
      
    </GridListTile>
  );
};

export default PredictionListItem;
