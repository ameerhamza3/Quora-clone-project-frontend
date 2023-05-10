import { axiosConnect } from "../config/intercepter";
import authHeader from "../config/authHeader";

export const createAnswer = async (userId, questionId, text) => {
  try {
    const response = await axiosConnect().post(
      "answer/create-answer",
      {
        userId,
        questionId,
        text,
      },
      {
        headers: authHeader(),
      }
    );

    return response;
  } catch (error) {
    return [];
  }
};
