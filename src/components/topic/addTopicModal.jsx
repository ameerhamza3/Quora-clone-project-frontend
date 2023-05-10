import React from "react";

import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createTopic } from "../../services/topicService";
import useStyles from "../styles/TopicStyles/topicStyle";

import { toast } from "react-toastify";

import { topicModalValidationSchema } from "../../helper/validation";

const AddTopicModal = () => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("topicPicture", values.topicPicture);
    try {
      await createTopic(formData);
      toast.success("topic created successfully!!!");
      setIsModalOpen(false);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button style={{float:"left",backgroundColor:"red",color:"white"}} variant="contained"  onClick={handleModalOpen}>
        Add Topic
      </Button>
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <div className={classes.paper}>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleModalClose}
          >
            <CloseIcon />
          </IconButton>
          <h2 id="add-topic-modal-title">Add Topic</h2>
          <Formik
            initialValues={{ title: "", description: "", topicPicture: null }}
            validationSchema={topicModalValidationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <Field
                  name="title"
                  as={TextField}
                  id="title"
                  label="Title"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                />
                <ErrorMessage name="title" component="div" />

                <Field
                  name="description"
                  as={TextField}
                  id="description"
                  label="Description"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  multiline
                  required
                />
                <ErrorMessage name="description" component="div" />

                <input
                  id="topicPicture"
                  name="topicPicture"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("topicPicture", event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage name="topicPicture" component="div" />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default AddTopicModal;