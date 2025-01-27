import Footer from "./Footer";
import AppointmentTable from "./AppointmentTable";
import { useLocation } from "react-router-dom";
import UserNavbar from "./UserNavbar";

const Appointment = () => {
  const location = useLocation();
  const { doctor } = location.state || {};

  return (
    <div>
      <UserNavbar></UserNavbar>
      <AppointmentTable doctor={doctor}></AppointmentTable>
      <Footer></Footer>
    </div>
  );
};

export default Appointment;
