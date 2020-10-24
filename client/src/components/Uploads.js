import React, { useState } from "react";
/* import { post } from "axios"; */

const Upload = () => {
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    /* To grab file from input, for multiupload use for-loop */
    const file = e.target.files[0];
    previewFile(file);
  };

  /* Function to preview images that are uploaded */
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  /* Function to handle submitting the file */
  const handleSubmitFile = (e) => {
    console.log(e);
    /* Check if this can be optimized and if there is no selected file return */
    e.preventDefault();
    if (!previewSource) return;
    /* Use file set in previewSource variable */
    uploadImage(previewSource);
    /* const reader = new FileReader();
    reader.readAsDataURL(selectedFile); */
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage)
    /* STOPS HERE */
    
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitFile}>
        <h3>UPLOAD FILES</h3>
        <div className="form-group">
          <input
            className="form-control-file"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </div>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
};

export default Upload;
