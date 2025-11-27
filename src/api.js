// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://api.sarktossbook.com/api/v1/tossbook/"
});

export const loginUser = (data) => API.post("login", data);
