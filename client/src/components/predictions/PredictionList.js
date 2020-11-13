import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
/* import CircularProgress from "@material-ui/core/CircularProgress";
 */
const PredictionList = () => {
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

  

  const renderPredictionList = (building, index) => {
    return (
      <div key={building._id}>
        <small>date: {building.date}</small>
        <small>description:{building.description}</small>
        <Image
          key={index}
          cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
          publicId={building.url}
          width="300"
          crop="scale"
        />
      </div>
    );
  };

 /*  if (buildings!=="") {
    return <CircularProgress color="secondary" />;
  } */

  return (
    <div>
      {buildings.map((building, index) => {
        return renderPredictionList(building, index);
      })}
    </div>
  );
};

export default PredictionList;
