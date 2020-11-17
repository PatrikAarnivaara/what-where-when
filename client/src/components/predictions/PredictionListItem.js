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
  date,
  showPredictionDetail,
}) => {
  const classes = useStyles();

  const handleOnClickItem = () => {
    showPredictionDetail(id, url, title, description, date);
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
        width="300"
        crop="scale"
      />
      {
        <GridListTileBar
          title={title}
          subtitle={<span>Prediction: {description}</span>}
          actionIcon={
            <IconButton
              aria-label={`info about ${title}`}
              className={classes.icon}
            >
              <InfoIcon />
              <Typography>{date}</Typography>
            </IconButton>
          }
        />
      }
    </GridListTile>
  );
};

export default PredictionListItem;
