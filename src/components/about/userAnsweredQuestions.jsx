import React, { useEffect, useState } from "react";
import { getUserAnsweredQuestionsByUserId } from "../../services/questionService";
import { Card, CardContent, Typography, Container, Grid } from "@mui/material";

const UserAnsweredQuestions = ({ userId }) => {
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  useEffect(() => {
    const fetchAnsweredQuestions = async () => {
      const response = await getUserAnsweredQuestionsByUserId(userId);
      setAnsweredQuestions(response.questions);
    };

    fetchAnsweredQuestions();
  }, [userId]);

  return (
    <Container>
      <Typography variant="h4" component="h2" align="center">
        User Answered Questions
      </Typography>
      {answeredQuestions.length === 0 ? (
        <Typography variant="body1" align="center">
          No answered questions.
        </Typography>
      ) : (
        <Grid container spacing={2} mt={4}>
          {answeredQuestions.map((question) => (
            <Grid item xs={12} sm={6} md={4} key={question.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h3">
                    {question.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Ansked by {question.user.name}
                  </Typography>
                  {question.answers.length === 0 ? (
                    <Typography variant="body1" component="p">
                      No answers.
                    </Typography>
                  ) : (
                    question.answers.map((answer) => (
                      <Typography
                        key={answer.id}
                        variant="body1"
                        component="p"
                      >
                        {answer.text}
                      </Typography>
                    ))
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default UserAnsweredQuestions;
