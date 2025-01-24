import React from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Appointment from "./components/Appointment";
import UserProfile from "./components/UserProfile";

function App() {
  const AppointmentWrapper = () => {
    const location = useLocation();
    const doctor = location.state?.doctor;
    return <Appointment doctor={doctor} />;
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>} />
          <Route path="/home" element={<HomePage></HomePage>} />
          <Route path="/about" element={<h2>About Us</h2>} />
          <Route
            path="/appointment"
            element={<AppointmentWrapper></AppointmentWrapper>}
          />
          <Route path="/profile" element={<UserProfile></UserProfile>} />
          <Route path="/register" element={<RegisterForm></RegisterForm>} />
          <Route path="/login" element={<LoginForm></LoginForm>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
