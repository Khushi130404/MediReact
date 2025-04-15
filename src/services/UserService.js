import axios from "axios";

const BASE_URL = "http://localhost:8080";
const USER_LOGIN_API = `${BASE_URL}/user/login_user`;
const USER_REGISTRATION_API = `${BASE_URL}/user/register`;
const USER_UPDATE_API = `${BASE_URL}/user/update_user`;
const USER_ID_API = `${BASE_URL}/user/userInfo`;
const USER_MAIL_API = `${BASE_URL}/user/by_mail`;
const USER_MOBILE_API = `${BASE_URL}/user/by_mobile`;

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

export const updateUser = async (userInfo) => {
  try {
    console.log(userInfo);
    const response = await axios.post(USER_UPDATE_API, userInfo);
    console.log("Hello");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};

export const findUserById = async (userId) => {
  try {
    const user = await axios.post(`${USER_ID_API}/${userId}`);
    return user.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};

export const findUserByMail = async (mail) => {
  try {
    const user = await axios.post(`${USER_MAIL_API}/${mail}`);
    return user.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};

export const findUserByMobile = async (mobile) => {
  try {
    const user = await axios.post(`${USER_MOBILE_API}/${mobile}`);
    return user.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};
