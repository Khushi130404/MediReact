import axios from "axios";

const BASE_URL = "http://localhost:8080";
const CHECK_ADMIN_API = `${BASE_URL}/admin/login`;

export const checkAdminLogin = async (adminName, adminPass) => {
  try {
    const response = await axios.post(CHECK_ADMIN_API, null, {
      params: {
        adminName,
        adminPass,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Admin login failed:", error);
    throw error.response?.data || "Something went wrong!";
  }
};
