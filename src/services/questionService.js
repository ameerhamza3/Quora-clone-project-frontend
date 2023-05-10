import { axiosConnect } from "../config/intercepter";
import authHeader from "../config/authHeader";

export const createQuestion = async (userId, topicId, title, description) => {
  try {
    const response = await axiosConnect().post(
      "question/create-question",
      {
        userId,
        topicId,
        title,
        description,
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

export const getTopicQuestionsForUser = async (userId) => {
  try {
    const response = await axiosConnect().get(
      `question/get-topic-questions?userId=${userId}`,
      {
        headers: authHeader(),
      }
    );
    console.log(response);
    return response.data.questions;
  } catch (error) {
    return [];
  }
};

export const getQuestionAnswers = async (questionId) => {
  try {
    const response = await axiosConnect().get(
      `question/get-question-answers/${questionId}`,
      {
        headers: authHeader(),
      }
    );
    
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getQuestionsWithAnswersByUserId = async (userId) => {
  try {
    const response = await axiosConnect().get(
      `question/get-user-questions-with-answers?userId=${userId}`,
      {
        headers: authHeader(),
      }
    );
 
    return response.data;
  } catch (error) {
    return [];
  }
};
export const getUserAnsweredQuestionsByUserId = async (userId) => {
  try {
    const response = await axiosConnect().get(
      `question/get-user-answered-questions?userId=${userId}`,
      {
        headers: authHeader(),
      }
    );
 
    return response.data;
  } catch (error) {
    return [];
  }
};

export const searchQuestionsByTopic = async (query) => {
  try {
    const response = await axiosConnect().get(
      `question/search-questions-by-topic?query=${query}`,
      {
        headers: authHeader(),
      }
    );

    return response.data;
  } catch (error) {
    return [];
  }
};