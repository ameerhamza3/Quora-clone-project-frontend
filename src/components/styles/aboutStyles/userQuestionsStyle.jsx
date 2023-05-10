import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(50),
        },
      },
    card: {
        marginBottom: theme.spacing(2),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "600px",
        },
        [theme.breakpoints.down("xs")]: {
          width: "90%",
        },
      
    },
    title: {
      fontWeight: "bold",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: "80%",
      maxWidth: 600,
      maxHeight: "80vh",
      overflow: "auto",
    },
    answer: {
        marginBottom: theme.spacing(2),
      },
      text: {
        fontSize: "1.2rem",
        fontWeight: "bold",
      },
      user: {
        fontSize: "0.8rem",
        fontStyle: "italic",
      },
      divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        height: "2px",
        backgroundColor: "#ccc",
      },
      avatar: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: theme.spacing(4),
        border: "4px solid #fff",
        transition: "opacity 0.2s ease-in-out",
      },
  }));
  
  export default useStyles;
