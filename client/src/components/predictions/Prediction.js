import React, { useState, useEffect } from "react";
import axios from "axios";
import PredictionList from "./PredictionList";
import PredictionListItemDetail from "./PredictionListItemDetail";

const Prediction = () => {
  const [predictions, setPredictions] = useState([]);

  const [predictionDetailData, setPredictionDetailData] = useState({
    _id: "",
    url: "",
    title: "",
    description: "",
    date: "",
  });

  const showPredictionDetail = (id, url, title, description, date) => {
    setPredictionDetailData({
      ...predictionDetailData,
      _id: id,
      url: url,
      title: title,
      description: description,
      date: date,
    });
  };

  useEffect(() => {
    const getPredictions = async () => {
      try {
        const response = await axios.get("/api/predictions");
        console.log(response.data);
        setPredictions(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getPredictions();
  }, []);

  return (
    <div>
      <PredictionList
        predictions={predictions}
        showPredictionDetail={showPredictionDetail}
      />
      <PredictionListItemDetail predictionDetailData={predictionDetailData} />
    </div>
  );
};

export default Prediction;
