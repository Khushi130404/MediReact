import axios from "axios";

const BASE_URL = "http://localhost:8080";
const GET_APPOINTMENT_API = `${BASE_URL}/appointment/show`;

export const getAppointment = async () => {
  try {
    const appointment = await axios.get(GET_APPOINTMENT_API);
    return appointment.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};
