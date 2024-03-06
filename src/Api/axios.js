import axios from "axios";

const axiosInstance = axios.create({
  // local instance of firebase functions

  // baseURL: "http://127.0.0.1:5001/clone-2024-687f0/us-central1/api",

  baseURL: "https://amazon-api-deploy-wa1p.onrender.com",
});

export { axiosInstance };
