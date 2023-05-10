import React from "react";
import { Box } from "@material-ui/core";
import QuestionList from "../components/home/questionsLIst";
import FollowTopic from "../components/home/followTopic";

import useStyles from "./styles/homeStyles";

const Home = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <div className={classes.contentWrapper}>
        <div className={classes.followTopicContainer}>
          <FollowTopic />
        </div>
        <div className={classes.questionListContainer}>
          <QuestionList />
        </div>
      </div>
    </Box>
  );
};

export default Home;
