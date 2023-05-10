import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  Avatar,
  CardActions,
  Button,
  Link,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Favorite, FavoriteBorder } from "@material-ui/icons";

import { getAllTopics } from "../../services/topicService";
import useStyles from "../styles/HomeStyles/followTopicStyle";
import {
  followTopic,
  getFollowedTopicsByUserId,
} from "../../services/followTopicService";
import { getCurrentUserId } from "../../services/userService";

const FollowTopic = () => {
  const classes = useStyles();
  const [topics, setTopics] = useState([]);
  const [followedTopics, setFollowedTopics] = useState([]);
  const userId = getCurrentUserId();

  useEffect(() => {
    async function fetchTopics() {
      const response = await getAllTopics();
      const topicsWithFollowed = response.data.map((topic) => {
        const isFollowed = followedTopics.some((t) => t.topicId === topic.id);
        return {
          ...topic,
          followed: isFollowed,
        };
      });
      setTopics(topicsWithFollowed);
    }
    fetchTopics();

    async function fetchFollowedTopics() {
      const response = await getFollowedTopicsByUserId(userId);

      setFollowedTopics(response);
    }
    fetchFollowedTopics();
  }, [userId]);

  async function handleFollow(topicId) {
    const alreadyFollowing = followedTopics.some(
      (topic) => topic.topicId === topicId
    );

    if (!alreadyFollowing) {
      const response = await followTopic(userId, topicId);
      const updatedTopic = response.data;
      const updatedTopics = topics.map((topic) =>
        topic.id === topicId ? { ...topic, followed: true } : topic
      );
      setTopics(updatedTopics);
      setFollowedTopics([...followedTopics, updatedTopic]);
    }
  }

  return (
    <div className={classes.root}>
      {topics.map((topic) => (
        <Card key={topic.id} className={classes.card}>
          <CardActions disableSpacing>
            <Avatar variant="square" src={topic.topicPicture} alt="Profile" />
            <CardHeader
              style={{ float: "left" }}
              title={
                <Link
                  component={RouterLink}
                  to={`/topic/${topic.id}`}
                  color="inherit"
                >
                  {topic.title}
                </Link>
              }
            />

            <Button
              className={`${classes.followButton} ${
                topic.followed ? "following" : ""
              }`}
              onClick={() => handleFollow(topic.id)}
              startIcon={
                topic.followed ||
                followedTopics.some((t) => t.topicId === topic.id) ? (
                  <Favorite style={{ color: red[500] }} />
                ) : (
                  <FavoriteBorder />
                )
              }
            >
              {topic.followed ||
              followedTopics.some((t) => t.topicId === topic.id)
                ? "Following"
                : "Follow"}
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default FollowTopic;
