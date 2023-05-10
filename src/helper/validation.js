import * as Yup from "yup";

export const signUpvalidationSchema = Yup.object({
  name: Yup.string().trim().required("Name is required"),
  age: Yup.number().required("Age is required"),
  gender: Yup.string().trim().required("Gender is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: Yup.string()
    .trim()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  username: Yup.string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long"),
  profilePicture: Yup.mixed().required("Profile picture is required"),
});

export const signInValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const topicModalValidationSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
  description: Yup.string().trim().required("Description is required"),
  topicPicture: Yup.mixed().required("Topic picture is required"),
});

export const questionModalvalidationSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
  description: Yup.string().trim().required("Description is required"),
});
