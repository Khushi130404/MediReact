import axios from "axios";

const BASE_URL = "http://localhost:8080";
const GET_ABOUT_API = `${BASE_URL}/about/aboutDoc`;

export const findAboutInfoByDocId = async (doctorId) => {
  try {
    const aboutInfo = await axios.post(`${GET_ABOUT_API}/${doctorId}`);
    return aboutInfo.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};

