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
import Controls from "./components/Controls";
import AboutUs from "./components/AboutUs";
import AllPastAppointmentList from "./components/AllPastAppointmentList";
import SymptomSelector from "./components/SymptomSelector";
import ForgotGmail from "./components/ForgotGmail";
import ForgotSMS from "./components/ForgotSMS";

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
          <Route path="/about" element={<AboutUs></AboutUs>} />
          <Route
            path="/appointment"
            element={<AppointmentWrapper></AppointmentWrapper>}
          />
          <Route path="/profile" element={<UserProfile></UserProfile>} />
          <Route path="/register" element={<RegisterForm></RegisterForm>} />
          <Route path="/login" element={<LoginForm></LoginForm>} />
          <Route path="/user" element={<HomePage></HomePage>} />
          <Route path="/user/home" element={<HomePage></HomePage>} />
          <Route path="/user/about" element={<AboutUs></AboutUs>} />
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
          <Route
            path="/user/help"
            element={<SymptomSelector></SymptomSelector>}
          />
          <Route path="/doctor" element={<HomePage></HomePage>} />
          <Route path="/doctor/home" element={<HomePage></HomePage>} />
          <Route path="/doctor/about" element={<AboutUs></AboutUs>} />
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
          <Route
            path="/user/allPast"
            element={<AllPastAppointmentList></AllPastAppointmentList>}
          />

          <Route path="/admin/login" element={<LoginForm></LoginForm>} />
          <Route path="/admin/home" element={<HomePage></HomePage>} />
          <Route path="/admin/about" element={<AboutUs></AboutUs>} />
          <Route
            path="/admin/appointment"
            element={<AppointmentWrapperAdmin></AppointmentWrapperAdmin>}
          />
          <Route path="/admin/controls" element={<Controls></Controls>} />
          <Route path="/forgot/gmail" element={<ForgotGmail></ForgotGmail>} />
          <Route path="/forgot/sms" element={<ForgotSMS></ForgotSMS>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
