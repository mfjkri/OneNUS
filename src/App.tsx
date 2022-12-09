import React from "react";
import { Routes, Route } from "react-router-dom";

import "./assets/css/App.css";

import NavBar from "./components/static/navBar";
import LoginPage from "./components/core/users/loginPage";

function HelloWorld() {
  return <p style={{ color: "white" }}>Hello World</p>;
}

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<HelloWorld />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
