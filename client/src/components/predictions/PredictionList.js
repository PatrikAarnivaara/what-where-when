import React, { useState, useEffect } from "react";
import axios from "axios";
import GridList from "@material-ui/core/GridList";
import useStyles from "./useStyles";
import PredictionListItem from "./PredictionListItem";



const PredictionList = () => {
  const classes = useStyles();
  const [buildings, setBuildings] = useState([]);
  /* const [chatContent, setChatContent] = useState({
    userName: "",
    avatar: "",
    online: false,
    chat: "",
  }); */
  
  /* This function is for showing a chat window when clicking a single user in
  the chat menu */
  /* const showChatDialogue = (userName, avatar, chat, online) => {
    setChatContent({
      ...chatContent,
      userName: userName,
      avatar: avatar,
      chat: chat,
      online: online,
    });
  }; */


  useEffect(() => {
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
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {buildings.map((building, index) => (
          <PredictionListItem 
          key={index} 
          building={building} 
          index={index}>
          </PredictionListItem>
        ))}
      </GridList>
    </div>
  );
};

export default PredictionList;
