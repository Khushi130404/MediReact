import axios from "axios";

const BASE_URL = "http://localhost:8080";
const USER_LOGIN_API = `${BASE_URL}/user/login_user`;
const USER_REGISTRATION_API = `${BASE_URL}/user/register`;

export const loginUser = async (mail, pass) => {
  try {
    const user = await axios.post(`${USER_LOGIN_API}/${mail}/${pass}`);
    return user.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};

export const registerUser = async (userInfo) => {
  try {
    console.log(userInfo);
    const response = await axios.post(USER_REGISTRATION_API, userInfo);
    console.log("Hello");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};
