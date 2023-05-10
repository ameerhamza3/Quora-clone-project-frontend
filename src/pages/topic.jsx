import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopicById, getTopicFollowersCount } from "../services/topicService";
import TopicCard from "../components/topic/topicCard";
import TopicQuestions from "../components/topic/topicQuestions";

const TopicPage = () => {
  const [topic, setTopic] = useState({});
  const [followersCount, setFollowersCount] = useState(0);
  const { topicId } = useParams();

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
       
        const response = await getTopicById(topicId);
        setTopic(response.data);
        const countResponse = await getTopicFollowersCount(topicId);
        setFollowersCount(countResponse.data.followersCount);
      } catch (error) {
      
      }
    };
    fetchTopicData();
  }, [topicId]);

  return (
    <div style={{marginTop:"120px"}}>
      <TopicCard topic={topic} followersCount={followersCount} />

       <TopicQuestions/>
    </div>
  );
};

export default TopicPage;
