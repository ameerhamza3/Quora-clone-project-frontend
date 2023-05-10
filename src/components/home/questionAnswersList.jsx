import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionAnswers } from "../../services/questionService";
import { createAnswer } from "../../services/answerService";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { Link } from "react-router-dom";

import AnswerQuestion from "./answerModal";
import { getCurrentUserId } from "../../services/userService";
import { answerReaction } from "../../services/reactionService";
import useStyles from "../styles/HomeStyles/questionListStyle";
const QuestionAnswersList = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [reactions, setReactions] = useState({});
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const userId = getCurrentUserId();
  const classes = useStyles();
  useEffect(() => {
    const fetchQuestionAnswers = async () => {
      const response = await getQuestionAnswers(questionId);

      setQuestion(response.question);
      setAnswers(response.answers);
      const newReactions = {};
      response.answers.forEach((answer) => {
        if (answer.reaction) {
          newReactions[answer.id] = answer.reaction.type;
        }
      });
      setReactions(newReactions);
    };

    fetchQuestionAnswers();
  }, [questionId]);

  const handleAnswerButtonClick = () => {
    setShowAnswerModal(true);
  };

  const handleAnswerSubmit = async (text) => {
    const response = await createAnswer(userId, questionId, text);
    setAnswers([response.data, ...answers]);
    setShowAnswerModal(false);
  };

  const handleReaction = async (answerId, reactionType) => {
    try {
      await answerReaction(userId, answerId, reactionType);
      setReactions({ ...reactions, [answerId]: reactionType });
    } catch (error) {}
  };

  const getButtonBackgroundColor = (answerId, reactionType) => {
    if (reactions[answerId] === reactionType) {
      switch (reactionType) {
        case "like":
          return "green";
        case "downvote":
          return "red";
        default:
          return "gray";
      }
    } else {
      return "gray";
    }
  };
  return (
    <>
      <div style={{ backgroundColor: "#f2f2f2" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            style={{ marginBottom: "16px", width: "500px", marginTop: "100px" }}
          >
            <CardContent>
              <Typography className={classes.title} variant="h5" component="h2">
                {question.title}
              </Typography>
              <img
                src={question.user?.profilePicture}
                alt={question.user?.name}
                className={classes.avatar}
              />
              <Typography color="textSecondary" gutterBottom>
                Asked by {question.user?.name}
              </Typography>
              <Typography
                variant="body1"
                component="p"
                className={classes.title}
              >
                {question.text}
              </Typography>
              {userId !== question.user?.id && (
              <Button
                style={{ float: "right" }}
                variant="contained"
                onClick={handleAnswerButtonClick}
              >
                Answer
              </Button>
              )}
              <br />
            </CardContent>
          </Card>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#f2f2f2",
          }}
        >
          <div style={{ maxWidth: "500px", width: "100%" }}>
            <Typography color="textSecondary" gutterBottom>
              Answers of this Question
            </Typography>
            {answers.length === 0 ? (
              <Typography
                variant="h5"
                component="h2"
                align="center"
                color="textSecondary"
              >
                There are no answers for this question
              </Typography>
            ) : (
              answers.map((answer) => (
                <Card
                  key={answer.id}
                  style={{ marginBottom: "16px", width: "100%" }}
                >
                  <CardContent>
                    <img
                      src={answer.user.profilePicture}
                      alt={answer.user.name}
                      className={classes.avatar}
                    />
                     <Typography color="textSecondary" gutterBottom>
                  Answered by{" "}
                  <Link to={`/profile/${answer.user.id}`}>
                   {answer.user.name}
                  </Link>
                </Typography>
                    <Typography className={classes.title}>
                      {answer.text}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      style={{
                        backgroundColor: getButtonBackgroundColor(
                          answer.id,
                          "like"
                        ),
                      }}
                      startIcon={<ThumbUpAltIcon />}
                      onClick={() => handleReaction(answer.id, "like")}
                    >
                      {question.likes} 
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      style={{
                        backgroundColor: getButtonBackgroundColor(
                          answer.id,
                          "downvote"
                        ),
                      }}
                      startIcon={<ThumbDownAltIcon />}
                      onClick={() => handleReaction(answer.id, "downvote")}
                    >
                      {question.downvotes} 
                    </Button>
                  </CardActions>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
      {showAnswerModal && (
        <AnswerQuestion
          handleClose={() => setShowAnswerModal(false)}
          handleSubmit={handleAnswerSubmit}
          user={question.user}
          questionTitle={question.title}
        />
      )}
    </>
  );
};

export default QuestionAnswersList;
