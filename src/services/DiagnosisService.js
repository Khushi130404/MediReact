import axios from "axios";

const BASE_URL = "http://localhost:8080";
const DIAGNOS_ADD_API = `${BASE_URL}/doctor/addDiagnos`;

export const addDiagnosis = async (appId, image) => {
  try {
    const diagnosis = await axios.post(`${DIAGNOS_ADD_API}/${appId}/${image}`);
    return diagnosis.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};
