// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://tossbook-api-1008064032232.asia-south1.run.app/api/v1/tossbook/"
});

export const loginUser = (data) => API.post("login", data);
