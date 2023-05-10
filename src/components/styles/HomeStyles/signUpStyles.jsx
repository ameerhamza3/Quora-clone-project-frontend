import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "auto",
    marginTop: "10%",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "500px",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginTop: "5%",
      maxWidth: "90%",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "2%",
      maxWidth: "80%",
    },
    background: `url('/path/to/your/image.jpg') no-repeat center center fixed`,
    backgroundSize: "cover",
  },
  title: {
    margin: "0",
    fontWeight: "bold",
    color: "red",
    fontSize: "3rem",
    textAlign: "center",
  },
  subtitle: {
    margin: "0",
    color: theme.palette.primary.darkGray,
    fontSize: "1.2rem",
    textAlign: "center",
  },
  textField: {
    margin: theme.spacing(1, 0),
    width: "100%",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  select: {
    "&:hover:not(.Mui-disabled):before": {
      borderBottomColor: "#000000",
    },
    "&:before": {
      borderBottomColor: "#000000",
    },
    "&:after": {
      borderBottomColor: "#000000",
    },
  },

  signUpButton: {
    margin: theme.spacing(2, 0),

    borderRadius: "15px",
    width: "40%",
    float:"right",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  signInButton: {
    margin: theme.spacing(2, 0),
    float:"right",
    borderRadius: "15px",
    width: "20%",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
  uploadButton: {
    margin: theme.spacing(1, 0),
    padding: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    cursor: "pointer",
  },

  error: {
    color: "red",
  },
}));

export default useStyles;
