import axios from "axios";

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
/* export default submitForm; */
