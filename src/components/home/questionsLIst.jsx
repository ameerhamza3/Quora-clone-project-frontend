import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopicQuestionsForUser } from "../../services/questionService";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { toast } from "react-toastify";

import { getCurrentUserId } from "../../services/userService";
import { questionReaction } from "../../services/reactionService";
import { createQuestion } from "../../services/questionService";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import QuestionModal from "./questionModal";
import useStyles from "../styles/HomeStyles/questionListStyle";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [reactions, setReactions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = getCurrentUserId();
  const classes = useStyles();

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getTopicQuestionsForUser(userId);
      setQuestions(response);

      const newReactions = {};
      response.forEach((question) => {
        if (question.reaction) {
          newReactions[question.id] = question.reaction.type;
        }
      });
      setReactions(newReactions);
    };
    fetchQuestions();
  }, [userId]);

  const handleReaction = async (questionId, reactionType) => {
    try {
      await questionReaction(userId, questionId, reactionType);
      if (reactionType === "like") {
        toast.success("Question " + reactionType);
      } else {
        toast.error("Question " + reactionType);
      }
      setReactions({ ...reactions, [questionId]: reactionType });
    } catch (error) {
      console.log(error);
    }
  };

  const getButtonBackgroundColor = (questionId, reactionType) => {
    if (reactions[questionId] === reactionType) {
      switch (reactionType) {
        case "like":
          return "green";

        case "dislike":
          return "red";
        default:
          return "gray";
      }
    } else {
      return "gray";
    }
  };
  const handleAddQuestionClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateQuestion = async (userId, topicId, title, description) => {
    try {
      const response = await createQuestion(
        userId,
        topicId,
        title,
        description
      );
      setQuestions([response.data, ...questions]);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleAddQuestionClick}
            style={{
              alignItems: "center",
              fontSize: "0.975rem",
              backgroundColor: "red",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            Add Question
          </Button>
        </div>
        {questions.length === 0 ? (
          <Typography
            variant="h5"
            component="h2"
            align="center"
            color="textSecondary"
          >
            There are no questions
          </Typography>
        ) : (
          questions.map((question) => (
            <Card className={classes.card} key={question.id}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.title}
                >
                  {question.title}
                </Typography>
                <img
                  src={question.user.profilePicture}
                  alt={question.user.name}
                  className={classes.avatar}
                />
                <Typography color="textSecondary" gutterBottom>
                  Asked by{" "}
                  <Link to={`/profile/${question.user.id}`}>
                    {question.user.name}
                  </Link>
                </Typography>
                <Typography variant="body2" component="p">
                  {question.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  style={{
                    backgroundColor: getButtonBackgroundColor(
                      question.id,
                      "like"
                    ),
                  }}
                  startIcon={<ThumbUpAltIcon />}
                  onClick={() => handleReaction(question.id, "like")}
                >
                  {question.likes}
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  style={{
                    backgroundColor: getButtonBackgroundColor(
                      question.id,
                      "dislike"
                    ),
                  }}
                  startIcon={<ThumbDownAltIcon />}
                  onClick={() => handleReaction(question.id, "dislike")}
                >
                  {question.dislike}
                </Button>
              </CardActions>
              <Link
                to={`/question/${question.id}/answers`}
                className={classes.answerButton}
                style={{
                  textDecoration: "underline",
                  color: "red",
                  marginRight: "10px",
                }}
              >
                Answers
              </Link>
              <br />
              <br />
            </Card>
          ))
        )}
      </div>
      <QuestionModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        onCreateQuestion={handleCreateQuestion}
      />
    </div>
  );
};

export default QuestionList;
