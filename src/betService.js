import axios from "axios";

const API_URL = "http://10.107.175.2:8080/api/v1/tossbook/getBetTransaction";

export const getBetTransactions = async (user_name) => {
  const response = await axios.post(
    API_URL,
    {
      betId: "",
      user_name: user_name
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
};