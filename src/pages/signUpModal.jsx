import { useState } from "react";

import { Formik, Form, Field } from "formik";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { toast } from "react-toastify";

import useStyles from "../components/styles/HomeStyles/signUpStyles";
import { registerUser } from "../services/userService";
import { signUpvalidationSchema } from "../helper/validation";
import { useNavigate } from 'react-router-dom';
const SignupModal = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const classes = useStyles();

  const initialValues = {
    name: "",
    age: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    profilePicture: null,
  };

  const onSignUpSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("age", values.age);
      formData.append("gender", values.gender);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("username", values.username);
      formData.append("profilePicture", values.profilePicture);
      const response = await registerUser(formData);
     
      if (response.status === 201) {
       
        navigate('/');
       toast.success("User Registered Successfully!!!");
   
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 409) {
        toast.error(error.response.data.message);
      } else {
        toast.error("User already EXists!!!");
      }
    }
  };

  return (
    <div>
      <Dialog open={true}>
        <div className={classes.paper}>
          <h1 className={classes.title}>Quora</h1>
          <p className={classes.subtitle}>
            Enter your details below to create an account.
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={signUpvalidationSchema}
            onSubmit={onSignUpSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form enctype="multipart/form-data">
                <Field
                  as={TextField}
                  className={classes.textField}
                  label="Name"
                  name="name"
                  variant="outlined"
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
                <Field
                  as={TextField}
                  className={classes.textField}
                  label="Age"
                  name="age"
                  type="number"
                  variant="outlined"
                  error={touched.age && Boolean(errors.age)}
                  helperText={touched.age && errors.age}
                />
                <Field
                  as={TextField}
                  className={`${classes.textField} ${classes.select}`}
                  label="Gender"
                  name="gender"
                  select
                  variant="outlined"
                  error={touched.gender && Boolean(errors.gender)}
                  helperText={touched.gender && errors.gender}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>

                <Field
                  as={TextField}
                  className={classes.textField}
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  className={classes.textField}
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <Field
                  as={TextField}
                  className={classes.textField}
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
                <Field
                  as={TextField}
                  className={classes.textField}
                  label="Username"
                  name="username"
                  variant="outlined"
                  error={touched.username && Boolean(errors.username)}
                  helperText={touched.username && errors.username}
                />
                <div className={classes.uploadButton}>
                  <Button variant="contained" component="label">
                    {selectedFile
                      ? selectedFile.name
                      : "Upload Picture"}
                    <input
                      name="profilePicture"
                      type="file"
                      onChange={(event) => {
                        setFieldValue(
                          "profilePicture",
                          event.currentTarget.files[0]
                        );
                        setSelectedFile(event.currentTarget.files[0]);
                      }}
                      hidden
                    />
                  </Button>
                </div>
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Dialog>
    </div>
  );
};

export default SignupModal;
