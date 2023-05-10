import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  Avatar,
  CardActions,
  Link,
} from "@material-ui/core";

import { getFollowedTopicsByUserId } from "../../services/followTopicService";
import { getCurrentUserId } from "../../services/userService";
import useStyles from "../styles/HomeStyles/followTopicStyle";

const FollowTopic = () => {
  const classes = useStyles();
  const [followedTopics, setFollowedTopics] = useState([]);
  const userId = getCurrentUserId();

  useEffect(() => {
    async function fetchFollowedTopics() {
      const response = await getFollowedTopicsByUserId(userId);
      setFollowedTopics(response);
    }
    fetchFollowedTopics();
  }, [userId]);

  return (
    <div className={classes.root}>
      {followedTopics.map((followedTopic) => (
        <Card key={followedTopic.id} className={classes.card}>
          <CardActions disableSpacing>
            <Avatar
              variant="square"
              src={followedTopic.topic.topicPicture}
              alt="Profile"
            />
            <CardHeader
              style={{ float: "right" }}
              title={
                <Link
                  component={RouterLink}
                  to={`/topic/${followedTopic.topic.id}`}
                  color="inherit"
                >
                  {followedTopic.topic.title}
                </Link>
           
              }
              
            />
                
                 <Typography variant="h6"style={{color:"red"}} >
              Following
          </Typography>
          </CardActions>
          
        </Card>
      ))}
    </div>
  );
};

export default FollowTopic;
