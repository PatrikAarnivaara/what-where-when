import React from "react";
import GridList from "@material-ui/core/GridList";
import useStyles from "./useStyles";
import PredictionListItem from "./PredictionListItem";

const PredictionList = ({ predictions, showPredictionDetail }) => {
  const classes = useStyles();
  console.log(predictions)

  return (
    <div className={classes.root}>
      <GridList cellHeight={100} className={classes.gridList} cols={1}>
        {predictions.map((prediction, index) => (
          <PredictionListItem
            key={index}
            id={prediction._id}
            url={prediction.url}
            title={prediction.title}
            description={prediction.description}
            probability={prediction.probability}
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
