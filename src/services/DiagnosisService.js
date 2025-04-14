import axios from "axios";

const BASE_URL = "http://localhost:8080";
const DIAGNOS_ADD_API = `${BASE_URL}/diagnosis/addDiagnos`;
const DIAGNOS_GET_API = `${BASE_URL}/diagnosis/getDiagnosis`;

export const addDiagnosis = async (appId, formData) => {
  try {
    console.log("In Diag Service");
    await axios.post(`${DIAGNOS_ADD_API}/${appId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Upload successful:");
  } catch (error) {
    console.error(
      "Upload error:",
      error.response?.data || "Something went wrong!"
    );
    throw error.response?.data || "Something went wrong!";
  }
};

export const getDiagnosis = async (appId) => {
  try {
    const response = await axios.get(`${DIAGNOS_GET_API}/${appId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching diagnosis:", error.response || error);
    throw error.response?.data || "Something went wrong!";
  }
};
