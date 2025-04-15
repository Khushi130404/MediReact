import axios from "axios";

const BASE_URL = "http://localhost:8080";
const SEND_SMS_API = `${BASE_URL}/sms/sendMail`;

export const sendSMS = async (smsDto) => {
  try {
    const response = await axios.post(SEND_SMS_API, smsDto);
    return response.data;
  } catch (error) {
    console.error("Error sending SMS :", error);
    throw error;
  }
};
