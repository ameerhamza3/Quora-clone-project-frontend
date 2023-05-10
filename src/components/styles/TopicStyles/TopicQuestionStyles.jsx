import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
 
    card: {
      maxWidth: 600,
        margin: "auto",
        marginTop: theme.spacing(4),
    },
    pagination: {
      display: "flex",
      justifyContent: "center",
      marginTop: theme.spacing(2),
    },
    avatar: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  }));
  

export default useStyles;
