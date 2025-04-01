import axios from "axios";

const BASE_URL = "http://localhost:8080";
const AI_MODEL_API = `${BASE_URL}/model/predictSpecialist`;

export const predictSpecialist = async (symptomVector) => {
  try {
    console.log(userInfo);
    const response = await axios.post(AI_MODEL_API, symptomVector);
    console.log("Hello");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong!";
  }
};
