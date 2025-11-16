// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/v1/tossbook/"
});

export const loginUser = (data) => API.post("login", data);
