import api from "./axiosInstance";
import endpoints from "./endpoints";

const Tossbook = {
  getAllBats: (body) => api.post(endpoints.getAllBats, body),
  getwallet:  (body) => api.post(endpoints.getwallet, body),
  getlogin:  (body) => api.post(endpoints.getlogin, body),
  // add other methods (get, put, delete) as needed
};

export default Tossbook;
