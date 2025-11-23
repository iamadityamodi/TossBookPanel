import axios from "axios";

// Base URL for dev — change from .env as needed
const BASE_URL = "http://localhost:8080";
// const BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,        // now you can use relative paths everywhere
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
