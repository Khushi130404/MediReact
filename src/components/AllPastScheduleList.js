import { useEffect, useState } from "react";
import { getAllPastDocAppointment } from "../services/AppointmentService";
import styles from "./AllPastScheduleList.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AllPastSchedule from "./AllPastSchedule";

const AllPastScheduleList = () => {
  const [appointments, setAppointments] = useState([]);
  const loggedDoc = JSON.parse(localStorage.getItem("logged_doctor"));

  useEffect(() => {
    const fetchPastAppointments = async () => {
      try {
        const pastAppointments = await getAllPastDocAppointment(
          loggedDoc.doctorId
        );
        const sortedAppointments = pastAppointments.sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split("-").map(Number);
          const [dayB, monthB, yearB] = b.date.split("-").map(Number);

          const dateA = new Date(yearA, monthA - 1, dayA);
          const dateB = new Date(yearB, monthB - 1, dayB);

          return dateB - dateA;
        });

        setAppointments(sortedAppointments);
      } catch (error) {
        console.error("Error fetching past appointments:", error);
      }
    };

    fetchPastAppointments();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.container}>
        <h2 className={styles.heading}>Past Appointments</h2>
        {appointments.length > 0 ? (
          <ul className={styles.appointmentList}>
            {appointments.map((appointment) => (
              <AllPastSchedule
                key={appointment.appId}
                appointment={appointment}
              />
            ))}
          </ul>
        ) : (
          <p className={styles.noAppointments}>No past appointments found.</p>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AllPastScheduleList;
