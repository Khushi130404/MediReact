import React from "react";
import {
  useLocation,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";
import RegisterForm from "./components/RegisterForm";
import Appointment from "./components/Appointment";
import UserProfile from "./components/UserProfile";
import Schedule from "./components/Schedule";
import DoctorProfile from "./components/DoctorProfile";
import AllPastScheduleList from "./components/AllPastScheduleList";

function App() {
  const AppointmentWrapper = () => {
    const location = useLocation();
    const doctor = location.state?.doctor;
    return <Appointment doctor={doctor} />;
  };

  const AppointmentWrapperAdmin = () => {
    const location = useLocation();
    const doctor = location.state?.doctor;
    return <Schedule doctor={doctor} />;
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
          <Route path="/user" element={<HomePage></HomePage>} />
          <Route path="/user/home" element={<HomePage></HomePage>} />
          <Route path="/user/about" element={<h2>About Us</h2>} />
          <Route
            path="/user/appointment"
            element={<AppointmentWrapper></AppointmentWrapper>}
          />
          <Route path="/user/profile" element={<UserProfile></UserProfile>} />
          <Route
            path="/user/register"
            element={<RegisterForm></RegisterForm>}
          />
          <Route path="/user/login" element={<LoginForm></LoginForm>} />
          <Route path="/doctor" element={<HomePage></HomePage>} />
          <Route path="/doctor/home" element={<HomePage></HomePage>} />
          <Route path="/doctor/about" element={<h2>About Us</h2>} />
          <Route path="/doctor/schedule" element={<Schedule></Schedule>} />
          <Route
            path="/doctor/profile"
            element={<DoctorProfile></DoctorProfile>}
          />
          <Route
            path="/doctor/register"
            element={<RegisterForm></RegisterForm>}
          />
          <Route path="/doctor/login" element={<LoginForm></LoginForm>} />
          <Route
            path="/doctor/allPast"
            element={<AllPastScheduleList></AllPastScheduleList>}
          />
          <Route path="/admin/login" element={<LoginForm></LoginForm>} />
          <Route path="/admin/home" element={<HomePage></HomePage>} />
          <Route path="/admin/about" element={<h2>About Us</h2>} />
          <Route
            path="/admin/appointment"
            element={<AppointmentWrapperAdmin></AppointmentWrapperAdmin>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
