import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // adjust if your backend runs elsewhere
  withCredentials: true,
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
