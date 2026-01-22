// src/utils/axiosClient.ts
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

// INTERCEPTOR to handle expired token
axiosClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/?expired=1"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
