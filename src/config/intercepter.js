import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const axiosConnect = () => {
  const apiClient = axios.create({
    baseURL: BASE_URL,
  });

  apiClient.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  });

  return apiClient;
};
