import axios from "axios";

const BASE_URL = "http://localhost:8080";
const GET_APPOINTMENT_API = `${BASE_URL}/appointment/show`;

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
