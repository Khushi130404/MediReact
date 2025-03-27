import axios from "axios";

const BASE_URL = "http://localhost:8080";
const DOCTOR_LOGIN_API = `${BASE_URL}/doctor/login_doctor`;
const DOCTOR_SHOW_API = `${BASE_URL}/doctor/show_doctor`;
const DOCTOR_BY_DOCID_API = `${BASE_URL}/doctor/get_doctor`;
const DOCTOR_UPDATE_API = `${BASE_URL}/doctor/update_doctor`;
const DOCTOR_DELETE_API = `${BASE_URL}/doctor/delete_doctor`;

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
    // console.log(docList);
    return docList.data;
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

export const updateDoctor = async (doctorInfo) => {
  try {
    console.log(doctorInfo);
    const response = await axios.post(DOCTOR_UPDATE_API, doctorInfo);
    console.log("Hello");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};

export const deleteDoctor = async (doctorId) => {
  try {
    const response = await axios.delete(`${DOCTOR_DELETE_API}/${doctorId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};
