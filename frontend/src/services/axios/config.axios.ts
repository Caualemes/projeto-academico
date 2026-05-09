import axios from "axios";
import { REST_CONFIG } from "../constant/sistema.constants";

export const http = axios.create({
  baseURL: REST_CONFIG.BASE_URL,
  timeout: 15000,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
