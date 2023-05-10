import { axiosConnect } from "../config/intercepter";
import authHeader from "../config/authHeader";

export const questionReaction = async (userId, questionId, reactionType) => {
  try {
    const response = await axiosConnect().post(
      "question-reaction",
      {
        userId,
        questionId,
        reactionType,
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

export const answerReaction = async (userId, answerId, reactionType) => {
  try {
    const response = await axiosConnect().post(
      "answer-reaction",
      {
        userId,
        answerId,
        reactionType,
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
