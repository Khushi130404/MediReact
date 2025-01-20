import axios from "axios";

const BASE_URL = "http://localhost:8080";
const USER_LOGIN_API = "";

export const loginUser = async (mail, pass) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/login_user/${mail}/${pass}`
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};
