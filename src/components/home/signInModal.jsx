import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { toast } from 'react-toastify';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from "react-router-dom";

import useStyles from '../styles/HomeStyles/signUpStyles';
import { loginUser } from '../../services/userService';
import { signInValidationSchema } from '../../helper/validation';
import SignUpModal from '../../pages/signUpModal';

const SignInModal = ({ setIsLoggedIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [openSignUpModal, setOpenSignUpModal] = useState(false);
  const classes = useStyles();

  const initialValues = {
    email: '',
    password: '',
  };

  const onSignInSubmit = async (values) => {
    try {
      const response = await loginUser(values.email, values.password);

      if (response.status === 200) {
        toast.success(response.data.message);
        setIsLoggedIn(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
   
      toast.error('Username or Password Incorrect!!!.');
    }
  };

  return (
    <div>
      <Dialog open={true}>
        <div className={classes.paper}>
          <h1 className={classes.title}>Quora</h1>
          <p className={classes.subtitle}>
            Enter your details below to sign in to your account.
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={signInValidationSchema}
            onSubmit={onSignInSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  as={TextField}
                  className={classes.textField}
                  label="Email"
                  name="email"
                  variant="outlined"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <Field
                  as={TextField}
                  className={classes.textField}
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: showPassword ? (
                      <VisibilityOff
                        className={classes.icon}
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <Visibility
                        className={classes.icon}
                        onClick={() => setShowPassword(true)}
                      />
                    ),
                  }}
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
          <Link
             to={`/signUp`}
           
            className={classes.answerButton}
            style={{ textDecoration: "underline", color: "red" ,marginRight:"10px",float:"right"}}
          >
            Create an Account?
          </Link>
        </div>
      </Dialog>
      {openSignUpModal && (
        <SignUpModal handleClose={() => setOpenSignUpModal(false)} />
      )}
    </div>
  );
};

export default SignInModal;
