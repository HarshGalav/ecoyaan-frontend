import axios from "axios";
import { CONSTANTS } from "./constants";

const axiosInstance = axios.create({
  baseURL: CONSTANTS.API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("idk");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);

export default axiosInstance;
