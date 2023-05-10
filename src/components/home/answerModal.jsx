import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStyles from "../styles/HomeStyles/questionListStyle";
const AnswerQuestionModal = ({
  user,
  questionTitle,
  handleSubmit,
  handleClose,
}) => {
  const classes = useStyles();
  const validationSchema = Yup.object().shape({
    answer: Yup.string()
      .required("Answer cannot be empty")
      .max(500, "Answer must be 500 characters or less"),
  });

  const formik = useFormik({
    initialValues: {
      answer: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values.answer);
      handleClose();
    },
  });

  return (
    <Dialog
      PaperProps={{
        sx: {
          width: "100%",
          maxHeight: 300,
        },
      }}
      open={true}
      onClose={handleClose}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Avatar
              src={user.profilePicture}
              alt={user.name}
              sx={{ marginRight: 1 }}
            />
            <Typography variant="h6">{user.name}</Typography>
          </Box>
          <Typography style={{fontWeight:"bold"}} variant="subtitle1">
            {questionTitle}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="answer"
            label="Your Answer"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={formik.values.answer}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.answer)}
            helperText={formik.errors.answer}
            sx={{ maxWidth: "100%", maxHeight: "50vh" }}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AnswerQuestionModal;
