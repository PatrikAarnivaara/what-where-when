import React, { useState } from "react";
import { submitForm } from "../api/submitForm";

const UploadForm = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

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
          File
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
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
    </div>
  );
};

export default UploadForm;
