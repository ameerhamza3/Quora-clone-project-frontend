import { axiosConnect } from "../config/intercepter";
import authHeader from "../config/authHeader";

export const createTopic = async (formData) => {
  try {
    const response = await axiosConnect().post("topic/", formData, {
      headers: authHeader(),
    });

    return response;
  } catch (error) {
    return [];
  }
};
export const getAllTopics = async () => {
  try {
    const response = await axiosConnect().get("topic/get-all-topics", {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return [];
  }
};

export const getTopicById = async (topicId) => {
  try {
    const response = await axiosConnect().get(`topic/${topicId}`, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return [];
  }
};
export const getTopicFollowersCount = async (topicId) => {
  try {
    const response = await axiosConnect().get(`topic/${topicId}/followers`, {
      headers: authHeader(),
    });
    return response;
  } catch (error) {
    return [];
  }
};

export const getTopicQuestions = async (topicId, page) => {
  try {
    const response = await axiosConnect().get(
      `topic/${topicId}/questions?page=${page}`,
      {
        headers: authHeader(),
      }
    );
    return response;
  } catch (error) {
    return [];
  }
};
