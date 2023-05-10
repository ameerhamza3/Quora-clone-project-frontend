import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Pagination from '@mui/material/Pagination';
import Avatar from '@mui/material/Avatar';
import { getTopicQuestions } from "../../services/topicService";
import { useParams } from "react-router-dom";

import useStyles from '../styles/TopicStyles/TopicQuestionStyles';

const TopicQuestions = () => {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const { topicId } = useParams();

  useEffect(() => {
    const fetchQuestionsData = async () => {
      try {
        const response = await getTopicQuestions(topicId, currentPage);
        setQuestions(response.data.questions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestionsData();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className={classes.root}>
    
        {questions.map((question) => (
      
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {question.title}
                </Typography>
                <div>
                <Avatar
                
                  className={classes.avatar}
                  alt={question.user.name}
                  src={question.user.profilePicture}
                />
              </div>
                <Typography  color="textSecondary" gutterBottom>
                  Asked by {question.user.name} on {question.date}
                </Typography>
              
                <Typography variant="body2" component="p">
                  {question.description}
                </Typography>
              </CardContent>
             
            </Card>
         
        ))}
         <div className={classes.pagination}>
          <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
     
     </div>
      
    
    </div>
  );
};

export default TopicQuestions;
