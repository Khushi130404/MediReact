import axios from "axios";

const BASE_URL = "http://localhost:8080";
const GET_APPOINTMENT_API = `${BASE_URL}/appointment/show`;
const BOOK_APPOINTMENT_API = `${BASE_URL}/appointment/add`;
const DELET_APPOINTMENT_API = `${BASE_URL}/appointment/delete`;

export const getAppointment = async () => {
  try {
    const response = await axios.get(GET_APPOINTMENT_API);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);

    if (error.response) {
      console.error("Response Data:", error.response.data);
      console.error("Status Code:", error.response.status);
      console.error("Headers:", error.response.headers);
      throw new Error(error.response.data || "Server responded with an error.");
    } else if (error.request) {
      console.error("No Response Received:", error.request);
      throw new Error("No response from server. Check if backend is running.");
    } else {
      console.error("Error Setting Up Request:", error.message);
      throw new Error("Request setup failed.");
    }
  }
};

export const bookAppointment = async (appInfo) => {
  try {
    console.log(appInfo);
    const response = await axios.post(BOOK_APPOINTMENT_API, appInfo);
    console.log("Hello");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};

export const deleteAppointment = async (appId) => {
  try {
    const response = await axios.post(`${DELET_APPOINTMENT_API}/${appId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};
