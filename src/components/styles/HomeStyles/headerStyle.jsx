import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#ffffff",
    color: theme.palette.primary.main,
    boxShadow: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(1, 4),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(1, 6),
    },
  },
  title: {
    fontWeight: 700,
    fontFamily: "inherit",
    color: "red",
  },
  titleLink: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  homeIcon: {
    marginLeft: theme.spacing(2),
    alignSelf: "center",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(10),
      marginRight: theme.spacing(2),
    },
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: theme.shape.borderRadius,
    marginLeft: "auto",
    marginRight: "auto",
    width: "500px",
  },
  searchIcon: {
    padding: theme.spacing(1),
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "red",
    minWidth: "48px",
  },
  inputRoot: {
    color: "black",
  },
  inputInput: {
    padding: theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "auto",
      minWidth: "100px",
      "&:focus": {
        width: "100px",
      },
    },
  },
  grow: {
    flexGrow: 1,
  },
  profilePicture: {
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(1),
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none",
    minWidth: "400px",
    maxWidth: "800px",
  },
  modalTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },

    searchResults: {
     
      top: "100%",
      left: theme.spacing(2), 
      width: "calc(100% - 4px)", 
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[1],
      zIndex: 1,
      marginTop: theme.spacing(3),  
      padding: theme.spacing(1),
      maxHeight: 200,
      overflowY: "auto",
      marginTop:"60px"
    },

  
  searchResultItem: {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export default useStyles;
