import React, { useState } from "react";
import axios from "axios";

const UserForm = () => {
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  onChange = (e) => {
    switch (e.target.name) {
      case "selectedFile":
        setSelectedFile({ selectedFile: e.target.files[0] });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { description, selectedFile } = this.state;
    let formData = new FormData();
    console.log(selectedFile);

    formData.append("description", description);
    formData.append("selectedFile", selectedFile);

    console.log(formData);

    axios.post("/", formData).then((result) => {
      // access results...
    });
  };

  return (
    <form onSubmit={this.onSubmit}>
      <input
        type="text"
        name="description"
        value={description}
        onChange={this.onChange}
      />
      <input type="file" name="selectedFile" onChange={this.onChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
