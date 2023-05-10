import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { editUserProfile } from "../../services/profileService";
import { getCurrentUserId } from "../../services/userService";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../../components/styles/userProfile";
import AddTopicModal from "../../components/topic/addTopicModal";
import FollowTopic from "../../components/about/followedTopic";
import UserQuestions from "./userQuestions";
import UserAnsweredQuestions from "./userAnsweredQuestions";
const validationSchema = Yup.object().shape({
  newName: Yup.string().required("Required"),
  newAge: Yup.number().required("Required"),
});

const UserProfile = (props) => {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newName, setNewName] = React.useState(props.userData.name);
  const [newAge, setNewAge] = React.useState(props.userData.age);
  const userId = getCurrentUserId();

  const { name, profilePicture, age } = props.userData;

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setNewName(name);
    setNewAge(age);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (values, actions) => {
    try {
      await editUserProfile(userId, values);
      props.onUpdate({ ...props.userData, ...values });
      setNewName(newName); 
      setNewAge(newAge); 
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };
  
  return (
    <div>
      <Box className={classes.header}>
        <div className={classes.avatarContainer}>
          <Avatar
            src={profilePicture}
            alt="Profile"
            className={classes.avatar}
          />
        </div>
        <div>
          <Typography variant="h5" className={classes.name}>
            {name}
            {userId === props.userData.id && (
              <IconButton aria-label="edit name" onClick={handleModalOpen}>
                <EditIcon />
              </IconButton>
            )}
          </Typography>
          <Typography variant="h5" className={classes.name}>
            age:{age}
          </Typography>
        </div>

        <Modal open={isModalOpen} onClose={handleModalClose}>
          <Box className={classes.modal}>
            <IconButton
              className={classes.closeIcon}
              onClick={handleModalClose}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.modalTitle}>
              Edit Profile
            </Typography>
            <Formik
              initialValues={{ newName, newAge }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="newName"
                    as={TextField}
                    label="New Name"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                  />
                  <Field
                    name="newAge"
                    as={TextField}
                    label="New Age"
                    type="number"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                    disabled={isSubmitting}
                  >
                    Save Changes
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>
      </Box>
      {userId === props.userData.id && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AddTopicModal />
        </div>
      )}

      {userId === props.userData.id && (
        <div style={{ display: "flex", float: "left" }}>
          <UserQuestions />
        </div>
      )}
      {userId === props.userData.id && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <FollowTopic />
        </div>
      )}

      <UserAnsweredQuestions userId={props.userData.id}/>
    </div>
  );
};



export default UserProfile;
