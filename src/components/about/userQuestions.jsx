import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Button,
  Modal,
  Backdrop,
  Fade,
} from "@material-ui/core";

import useStyles from "../../components/styles/aboutStyles/userQuestionsStyle";
import { getQuestionsWithAnswersByUserId } from "../../services/questionService";
import { getCurrentUserId } from "../../services/userService";
import { Divider } from "@material-ui/core";

const UserQuestions = () => {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const userId = getCurrentUserId();
  const handleOpen = (question) => {
    setSelectedQuestion(question);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getQuestionsWithAnswersByUserId(userId);
      setQuestions(response.questions);
    };
    fetchQuestions();
  }, [userId]);

  if (questions.length === 0) {
    return <Typography>No questions found.</Typography>;
  }
  return (
    <div className={classes.root}>
      {questions.map((question) => (
        <Card key={question.id} className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {question.title}
            </Typography>
            <Typography variant="body2" component="p">
              {question.description}
            </Typography>
          </CardContent>

          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => handleOpen(question)}
            >
              Answers
            </Button>
          </CardActions>
        </Card>
      ))}
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography
              variant="h5"
              component="h2"
              className={classes.title}
              gutterBottom
            >
              {selectedQuestion?.title}
            </Typography>
            <Divider className={classes.divider} />
            {selectedQuestion?.answers.length === 0 ? (
              <Typography>No answers found for this question.</Typography>
            ) : (
              selectedQuestion?.answers.map((answer, index) => (
                <div key={answer.id} className={classes.answer}>
                  <div style={{ float: "left" }}>
                    <Avatar
                      src={answer.user?.profilePicture}
                      alt="Profile"
                      className={classes.avatar}
                    />
                  </div>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    className={classes.user}
                  >
                    Answered by {answer.user.name} ({answer.user.email})
                  </Typography>
                  <Typography variant="subtitle1" className={classes.text}>
                    {answer.text}
                  </Typography>

                  {index !== selectedQuestion.answers.length - 1 && (
                    <Divider className={classes.divider} />
                  )}
                </div>
              ))
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default UserQuestions;
