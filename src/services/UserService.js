import axios from "axios";

const BASE_URL = "http://localhost:8080";
const USER_LOGIN_API = `${BASE_URL}/doctor/login_doctor`;

export const loginUser = async (mail, pass) => {
  try {
    const user = await axios.post(`${USER_LOGIN_API}/${mail}/${pass}`);
    return user.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};
