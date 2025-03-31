import axios from "axios";

const BASE_URL = "http://localhost:8080";
const SEND_MAIL_API = `${BASE_URL}/mail/sendMail`;

export const sendMail = async (emailDto) => {
    try {
        const response = await axios.post(SEND_MAIL_API, emailDto);
        return response.data;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};