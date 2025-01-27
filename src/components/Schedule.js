import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ScheduleTable from "./ScheduleTable";

const Schedule = () => {
  const location = useLocation();

  return (
    <div>
      <Navbar></Navbar>
      <ScheduleTable></ScheduleTable>
      <Footer></Footer>
    </div>
  );
};

export default Schedule;
