import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
