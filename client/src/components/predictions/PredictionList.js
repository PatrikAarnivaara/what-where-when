import React, { useState, useEffect } from "react";
import axios from "axios";
import GridList from "@material-ui/core/GridList";
import useStyles from "./useStyles";
import PredictionListItem from "./PredictionListItem";

const PredictionList = ({ predictions, showPredictionDetail }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {predictions.map((prediction, index) => (
          <PredictionListItem
            key={index}
            url={prediction.url}
            title={prediction.title}
            description={prediction.description}
            date={prediction.date}
            index={index}
            showPredictionDetail={showPredictionDetail}
          ></PredictionListItem>
        ))}
      </GridList>
    </div>
  );
};

export default PredictionList;
