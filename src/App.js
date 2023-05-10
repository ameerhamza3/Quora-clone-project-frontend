import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home";
import Profile from "./pages/about";
import TopicQuestions from "./pages/topic";
import QuestionAnswers from "./components/home/questionAnswersList";
import SignInModal from "./components/home/signInModal";
import SignUpModal from "./pages/signUpModal";
import Header from "./components/home/header";
import { logout } from "./services/userService";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedIsLoggedIn);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {isLoggedIn && <Header handleLogout={handleLogout} />}
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Home />
            ) : (
              <SignInModal setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
       <Route
  path="/profile/:userId"
  element={
    isLoggedIn ? (
      <Profile />
    ) : (
      <SignInModal setIsLoggedIn={setIsLoggedIn} />
    )
  }
/>

        <Route
          path="/question/:questionId/answers"
          element={
            isLoggedIn ? (
              <QuestionAnswers />
            ) : (
              <SignInModal setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        <Route path="/topic/:topicId/:page?" 
      element={
        isLoggedIn ? (
          <TopicQuestions />
        ) : (
          <SignInModal setIsLoggedIn={setIsLoggedIn} />
        )
      }
        />
        <Route
          path="/signUp"
          setIsLoggedIn={setIsLoggedIn}
          element={<SignUpModal />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
