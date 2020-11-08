import React, { useState } from "react";
import { submitForm } from "../api/submitForm";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
    const previewFileInput = e.target.files[0];
    previewFile(previewFileInput);
  };

  const previewFile = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  /* kanske måste skicka in previewSource här? */
  const uploadWithJSON = async () => {
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });

    const data = {
      title: title,
      file: await toBase64(file),
      description: description,
      date: new Date().toLocaleString(),
    };

    setPreviewSource("");

    submitForm("application/json", data, (msg) =>
      console.log("Upload SUBMIT JSON", msg)
    );
  };

  return (
    <div>
      <h2>Upload Form</h2>
      <form>
        <label>
          File Title
          <input
            type="text"
            vaue={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Give a title to your upload"
          />
        </label>
        <label>
          Preview File
          <input type="file" name="file" onChange={handleFileInputChange} />
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <input type="button" value="Upload as JSON" onClick={uploadWithJSON} />
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
};

export default UploadForm;
