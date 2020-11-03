import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
/* import Uploads from "../src/components/Uploads" */
import Header from "../src/components/Header/Header";
import Gallery from "../src/components/Gallery";
import UploadForm from "../src/components/UploadForm";
import ImageList from "../src/components/ImageList";
/* import UserForm from "../src/components/UserForm" */

function App() {
  return (
    <div className="App">
      <Header />
      <UploadForm />
      <ImageList />
      {/* <Uploads/> */}
      {/*      <Gallery/>
       */}{" "}
    </div>
  );
}

export default App;
