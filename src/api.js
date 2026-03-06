// src/api.js
import axios from "axios";

// const API_BASE_URL = "https://api.sarktossbook.com/api/v1/tossbook/";
export const API_BASE_URL = "https://api.sarktossbook.com";
// export const API_BASE_URL = "http://10.37.84.2:8080";

// Image base (same server)
export const IMAGE_BASE_URL = API_BASE_URL + "/upload/allbetimages/";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/tossbook/`,
});

export default api;
