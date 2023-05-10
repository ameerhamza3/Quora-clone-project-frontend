import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Typography,
  Popover,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import { searchQuestionsByTopic } from "../../services/questionService"; // Import the search function

import { getCurrentUser } from "../../services/userService";
import useStyles from "../styles/HomeStyles/headerStyle";

const Header = ({ handleLogout }) => {
  const classes = useStyles();
  const currentUser = getCurrentUser();

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleSearch = async (query) => {
    if (query) {
      const results = await searchQuestionsByTopic(query);
      setSearchResults(results);
    } else {
      setSearchResults([]); // Clear the search results when the query is empty
    }
  };
  
  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.titleLink}>
              Quora
            </Link>
          </Typography>

          <IconButton
            edge="start"
            className={classes.homeIcon}
            aria-label="home"
          >
            <Link to="/">
              <HomeIcon style={{ color: "red" }} />
            </Link>
          </IconButton>

          <div className={classes.searchContainer}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => handleSearch(e.target.value)} // Call handleSearch when the input value changes
            />
          </div>

          {currentUser && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt={currentUser.name}
                src={currentUser.profilePicture}
                className={classes.profilePicture}
                onClick={handleAvatarClick}
                style={{ cursor: "pointer" }}
              />

              <Popover
                className={classes.searchIcon}
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <List>
                  <ListItem
                    button
                    component={Link}
                    to={`/profile/${currentUser.userId}`}
                  >
                    <ListItemText primary="Profile" />
                  </ListItem>

                  <ListItem button onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </Popover>
            </div>
          )}
        </Toolbar>
      </AppBar>

    {/* Display the search results */}
    {searchResults.length > 0 && (
        <div className={classes.searchResults}>
          <List>
            {searchResults.map((result) => (
              <ListItem
                key={result.id}
                button
                component={Link}
                to={`/question/${result.id}`}
                className={classes.searchResultItem}
              >
                <ListItemText primary={result.title} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </>
  );
};

export default Header;
