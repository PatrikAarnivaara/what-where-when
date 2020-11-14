import React, { useState, useEffect } from "react";
import axios from "axios";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { Image } from "cloudinary-react";
import useStyles from "./useStyles";
/* import PredictionListItem from "./PredictionListItem"; */

/* import CircularProgress from "@material-ui/core/CircularProgress";
 */

const PredictionList = () => {
  const classes = useStyles();
  const [buildings, setBuildings] = useState([]);

  useEffect(function () {
    async function getBuildings() {
      try {
        const response = await axios.get("/api/buildings");
        setBuildings(response.data);
      } catch (error) {
        console.log("error", error);
      }
    }

    getBuildings();
  }, []);

  return (
    <div className={classes.root}>
      <GridList cellHeight={"auto"} cols={1}>
        {/* <GridListTile
          key="Subheader"
          cols={2.5}
        >
          <ListSubheader component="div" className={classes.subHeader}>
            Predictions
          </ListSubheader>
        </GridListTile> */}
        {buildings.map((building, index) => (
          <GridListTile key={index} className={classes.gridListTile}>
            <Image
              key={index}
              cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
              publicId={building.url}
              width="500"
              crop="scale"
            />
            {/* <img src={building.url} alt={building.title} /> */}
            {/* <GridListTileBar
              title={building.title}
              subtitle={<span>Predicition: {building.description}</span>}
              
              actionIcon={
                <IconButton
                  aria-label={`info about ${building.title}`}
                  className={classes.icon}
                >
                  <InfoIcon />
                </IconButton> */}
            {/* } /> */}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default PredictionList;
