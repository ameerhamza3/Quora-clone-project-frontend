import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { toast } from "react-toastify";
import { getFollowedTopicsByUserId } from "../../services/followTopicService";
import { getCurrentUserId } from "../../services/userService";
import useStyles from "../styles/HomeStyles/questionModalStyle";
import { questionModalvalidationSchema } from "../../helper/validation";

function QuestionModal({ isModalOpen, handleCloseModal, onCreateQuestion }) {
  const classes = useStyles();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    async function fetchFollowedTopics() {
      const userId = getCurrentUserId();
      const followedTopics = await getFollowedTopicsByUserId(userId);
      setTopics(followedTopics);
    }

    fetchFollowedTopics();
  }, []);

  async function handleTopicChange(event) {
    const topicId = event.target.value;
    const selectedTopic = topics.find((topic) => topic.id === topicId);
    setSelectedTopic(selectedTopic);
  }
  return (
    <Modal
      className={classes.modal}
      open={isModalOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isModalOpen}>
        <div className={classes.paper}>
          <div className={classes.header}>
            <Typography variant="h5" gutterBottom>
              Ask a Question
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseModal}
              color="inherit"
              edge="end"
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Formik
            initialValues={{ title: "", description: "" }}
            validationSchema={questionModalvalidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                const userId = getCurrentUserId();
                const topicId = selectedTopic.topicId;
                console.log(values.title);
                onCreateQuestion(
                  userId,
                  topicId,
                  values.title,
                  values.description
                );
                toast.success("new question created!!!");
                setSelectedTopic(null);
                setSubmitting(false);
                handleCloseModal();
              }, 0);
            }}
          >
            {({ values, errors, touched, isSubmitting }) => (
              <Form className={classes.form}>
                <Field
                  name="title"
                  as={TextField}
                  id="title"
                  label="Title"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  value={values.title}
                  error={touched.title && errors.title ? true : false}
                  helperText={touched.title && errors.title}
                />
                <FormControl variant="outlined" className={classes.select}>
                  <InputLabel id="select-topic-label">
                    {selectedTopic ? selectedTopic.title : "Select Topic"}
                  </InputLabel>
                  <Select
                    labelId="select-topic-label"
                    id="select-topic"
                    value={selectedTopic?.id || ""}
                    onChange={handleTopicChange}
                    label="Select Topic"
                  >
                    {topics.map((topic) => (
                      <MenuItem key={topic.id} value={topic.id}>
                        {topic.topic.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Field
                  name="description"
                  as={TextField}
                  id="description"
                  label="Description"
                  margin="normal"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={values.description}
                  error={
                    touched.description && errors.description ? true : false
                  }
                  helperText={touched.description && errors.description}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  className={classes.submitBtn}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Fade>
    </Modal>
  );
}

export default QuestionModal;
