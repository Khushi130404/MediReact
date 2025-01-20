import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/home" element={<HomePage></HomePage>} />
          <Route path="/about" element={<h2>About Us</h2>} />
          <Route path="/appointment" element={<h2>Book Appointment</h2>} />
          <Route path="/profile" element={<h2>User Profile</h2>} />
          <Route path="/register" element={<RegisterForm></RegisterForm>} />
          <Route path="/login" element={<LoginForm></LoginForm>} />
        </Routes>
      </div>
      {/* <HomePage></HomePage> */}
    </Router>
  );
}

export default App;
