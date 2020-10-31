import React from 'react';
import Uploads from "../src/components/Uploads"
import Gallery from "../src/components/Gallery"
import UploadForm from "../src/components/UploadForm"
/* import UserForm from "../src/components/UserForm" */


function App() {
  return (
    <div className="App">
     <UploadForm/>
     <Uploads/>
     <Gallery/>
    </div>
  );
}

export default App;
