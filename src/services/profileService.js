import authHeader from "../config/authHeader";
import { axiosConnect } from "../config/intercepter";

export const getUserDataById = async (userId) => {
  try {
    const response = await axiosConnect().get(`profile?userId=${userId}`, {
      headers: authHeader(),
    });

    return response;
  } catch (error) {
    return [];
  }
};

export const editUserProfile = async (userId, data) => {
  try {
    console.log(data);
    const response = await axiosConnect().patch(`profile/${userId}`, data, {
      headers: authHeader(),
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
