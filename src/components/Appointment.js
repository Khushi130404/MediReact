import Navbar from "./Navbar";
import Footer from "./Footer";
import AppointmentTable from "./AppointmentTable";
import { useLocation } from "react-router-dom";

const Appointment = () => {
  const location = useLocation();
  const { doctor } = location.state || {};

  return (
    <div>
      <Navbar></Navbar>
      <AppointmentTable doctor={doctor}></AppointmentTable>
      <Footer></Footer>
    </div>
  );
};

export default Appointment;
