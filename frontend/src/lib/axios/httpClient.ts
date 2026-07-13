import axios from "axios";

export const httpClient = axios.create({
  baseURL: "",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
