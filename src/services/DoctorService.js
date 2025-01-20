import axios from "axios";

const BASE_URL = "http://localhost:8080";
const DOCTOR_LOGIN_API = `${BASE_URL}/doctor/login_doctor`;

export const loginDoctor = async (mail, pass) => {
  try {
    const doctor = await axios.post(`${DOCTOR_LOGIN_API}/${mail}/${pass}`);
    return doctor.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};
