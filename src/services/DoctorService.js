import axios from "axios";

const BASE_URL = "http://localhost:8080";
const DOCTOR_LOGIN_API = `${BASE_URL}/doctor/login_doctor`;
const DOCTOR_SHOW_API = `${BASE_URL}/doctor/show_doctor`;
const DOCTOR_BY_DOCID_API = `${BASE_URL}/doctor/get_doctor`;

export const loginDoctor = async (mail, pass) => {
  try {
    const doctor = await axios.post(`${DOCTOR_LOGIN_API}/${mail}/${pass}`);
    return doctor.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};

export const showDoctor = async () => {
  try {
    const docList = await axios.get(DOCTOR_SHOW_API);
    return docList.data;
    console.log(docList);
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};

export const getDoctorById = async (docId) => {
  try {
    const doctor = await axios.post(`${DOCTOR_BY_DOCID_API}/${docId}`);
    return doctor.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};
