import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(4),
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
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginRight: theme.spacing(4),
      border: "4px solid #fff",
      transition: "opacity 0.2s ease-in-out",
    },
    name: {
      fontWeight: "bold",
      flexGrow: 1,
    },
    info: {
      marginBottom: theme.spacing(1),
      display: "flex",
      alignItems: "center",
    },
    infoText: {
      flexGrow: 1,
    },
    editButton: {
      display: "none",
      position: "absolute",
      color: "blue",
      top: "50%",
      left: "100%",
      transform: "translate(-50%, -50%)",
    },
    modal: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: theme.spacing(4),
        outline: "none",
        borderRadius: theme.spacing(1),
      },
      closeIcon: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1),
        cursor: "pointer",
      },
  }));
  export default useStyles;
