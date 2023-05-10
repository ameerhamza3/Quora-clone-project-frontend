import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(4),
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  followers: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    fontWeight: "bold",
  },
  title: {
    fontWeight: "bold",
  },
}));

export default useStyles;
