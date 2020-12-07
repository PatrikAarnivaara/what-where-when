import axios from "axios";

/* Check export of this function */

export const editForm = (contentType, data, setResponse) => {
 
  axios({
    url: `/api/edit/${data._id}`,
    method: "PATCH",
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
