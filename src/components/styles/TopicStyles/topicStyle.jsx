import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      closeButton: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1),
      },
      submitButton: {
        margin: theme.spacing(2, 0),
        float:"right",
        borderRadius: "15px",
        width: "40%",
        [theme.breakpoints.down("xs")]: {
          width: "100%",
        },
    }
      
}));

export default useStyles;
