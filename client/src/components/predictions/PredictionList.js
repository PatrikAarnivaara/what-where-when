import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";

function BuildingList() {
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
    <div>
      {buildings.reverse().map((building, index) => {
        return (
          <div key={building._id}>
            {/* <h4><Link to={`/buildings/${building._id}`}>{building.title}</Link></h4> */}
            <small>_id: {building._id}</small>
            <small>date: {building.date}</small>
            {/* <img src={building.url} alt={building.title} /> */}
            <small>description:{building.description}</small>
            <Image
            key={index}
            cloudName={process.env.REACT_APP_CLOUDINARY_NAME}
            publicId={building.url}
            width="300"
            crop="scale"
          />
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default BuildingList;
