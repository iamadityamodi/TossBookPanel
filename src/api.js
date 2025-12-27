// src/api.js
import axios from "axios";

// const API_BASE_URL = "https://api.sarktossbook.com/api/v1/tossbook/";
const API_BASE_URL = "http://10.96.136.2:8080/api/v1/tossbook/";



const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;
