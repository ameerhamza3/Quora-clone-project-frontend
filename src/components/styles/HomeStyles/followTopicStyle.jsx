import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    width: "50%",
    alignItems:"center",

    [theme.breakpoints.up("sm")]: {
      justifyContent:"center",
      alignItems:"center",
      width: "270px",
      
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
    backgroundColor: theme.palette.background.paper,
  },
  avatarContainer: {
    position: "relative",
    "&:hover $editButton": {
      display: "block",
    },
    "&:hover $avatar": {
      opacity: 0.7,
    },
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(4),
    border: "4px solid #fff",
    transition: "opacity 0.2s ease-in-out",
  },
  followButton: {
    variant:"text",
 
    transition: "color 0.2s ease-in-out",
    color: theme.palette.secondary.main,
    "&.following": {
      color: theme.palette.grey[500],
    },
    
  },
card:{
background:"none",
boxShadow:"none"
}
}));
  

export default useStyles;
