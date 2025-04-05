import axios from "axios";

const BASE_URL = "http://localhost:8080";
const GET_ABOUT_API = `${BASE_URL}/about/aboutDoc`;
const ADD_ABOUT_API = `${BASE_URL}/about/addAbout`;

export const findAboutInfoByDocId = async (doctorId) => {
  try {
    const aboutInfo = await axios.post(`${GET_ABOUT_API}/${doctorId}`);
    return aboutInfo.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};

export const addAboutInfo = async (doctorId, aboutText) => {
  try {
    const response = await axios.post(`${BASE_URL}/about/addAbout`, null, {
      params: {
        doctorId,
        about: aboutText,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add About Info:", error);
    throw error.response?.data || "Something went wrong!";
  }
};
