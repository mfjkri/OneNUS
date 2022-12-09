import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./assets/css/App.css";

import NavBar from "./components/static/navBar";
import SigninPage from "./components/core/users/signinPage";
import SignupPage from "./components/core/users/signupPage";

function HelloWorld() {
  return <p style={{ color: "white" }}>Hello World</p>;
}

function App() {
  const [isAuthenticated, setAuth] = useState(false);

  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HelloWorld /> : <SigninPage />}
        />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
