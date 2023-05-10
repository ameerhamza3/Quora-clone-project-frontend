import { axiosConnect } from "../config/intercepter";
import authHeader from "../config/authHeader";

export const followTopic = async (userId, topicId) => {
  try {
    const response = await axiosConnect().post(
      "follow/follow-topic/",
      {
        userId: userId,
        topicId: topicId,
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
export const getFollowedTopicsByUserId = async (userId) => {
  try {
    const response = await axiosConnect().get(
      `follow/followed-topics?userId=${userId}`,
      {
        headers: authHeader(),
      }
    );
    return response.data;
  } catch (error) {
    return [];
  }
};
