import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
      minWidth: 300,
      maxWidth: 600,
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    topicList: {
      maxHeight: 300,
      overflow: "auto",
    },
    topicItem: {
      cursor: "pointer",
    },
    closeButton: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1),
    },
    select: {
      minWidth: 200,
      margin: theme.spacing(1),
    },
  }));
  

export default useStyles;
