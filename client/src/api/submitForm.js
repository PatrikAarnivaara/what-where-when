import axios from "axios";

/* Check export of this function */

export const submitForm = (contentType, data, setResponse) => {
  axios({
    url: "/api/records",
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
