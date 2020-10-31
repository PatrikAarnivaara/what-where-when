import axios from "axios";

/* const API_BASE = "http://localhost:5000"; */
export const submitForm = (contentType, data, setResponse) => {
  console.log("Submit form: ", data);
  axios({
    url: "/api/upload",
    method: "POST",
    data: data,
    headers: {
      "Content-Type": contentType,
    },
  })
    .then((response) => {
      setResponse(response.data);
    })
    .catch((error) => {
      setResponse("error");
    });
};
