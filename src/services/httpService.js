import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;

  //Unexpected errors like (Browser security issue like CORS, network down, server down, db down, or bug in code)
  if (!expectedError) {
    console.log("Logging the error: ", error);
    toast.error("Unexpected error occurred.");
  }

  //promise rejected due to failure
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
