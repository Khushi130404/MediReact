import axios from "axios";

const BASE_URL = "http://localhost:8080";
const USER_LOGIN_API = "";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/user-controller/loginUser`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};
