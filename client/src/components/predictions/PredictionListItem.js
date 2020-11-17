import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "./useStyles";
import InfoIcon from "@material-ui/icons/Info";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Image } from "cloudinary-react";

const PredictionListItem = ({ index, building }) => {
  const classes = useStyles();

  /* const handleOnClickItem = () => {
    showChatDialogue(userName, avatar, chat, online);
  }; */

  const renderGridListItem = () => (
    <GridListTile
      className={classes.gridListTile} /* onClick={handleOnClickItem} */
      cols={3}
    >
      <Image
        key={index}
        cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
        publicId={building.url}
        width="300"
        crop="scale"
      />
      {
        <GridListTileBar
          title={building.title}
          subtitle={<span>Predicition: {building.description}</span>}
          actionIcon={
            <IconButton
              aria-label={`info about ${building.title}`}
              className={classes.icon}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      }
    </GridListTile>
  );

  return building ? renderGridListItem() : <CircularProgress />;
};

export default PredictionListItem;
