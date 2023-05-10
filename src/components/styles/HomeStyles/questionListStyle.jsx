import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "500px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  
      
    },
    title: {
      fontWeight: "bold",
    },
    avatar: {
      borderRadius: "50%",
      marginRight: theme.spacing(2),
      width: "50px",
      height: "50px",
      float:"left",
    },
    answerButton: {
      float:"right",
      marginLeft: "auto",
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
  }));
  
  

export default useStyles;
