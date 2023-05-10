import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
      backgroundColor: "#f2f2f2",
    },
    contentWrapper: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    followTopicContainer: {
      marginTop: "155px",
      marginRight: "10px",
    },
    questionListContainer: {
      marginTop: "100px",
    },
  }));
  
  export default useStyles;