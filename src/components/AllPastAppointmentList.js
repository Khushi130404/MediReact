import { useEffect, useState } from "react";
import { getAllPastUserAppointment } from "../services/AppointmentService";
import styles from "./AllPastAppointmentList.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AllPastAppointment from "./AllPastAppointment";

const AllPastAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("logged_user"));

  useEffect(() => {
    const fetchPastAppointments = async () => {
      try {
        const pastAppointments = await getAllPastUserAppointment(
          loggedUser.userId
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
        <h2 className={styles.heading}>Past Appointments of User</h2>
        {appointments.length > 0 ? (
          <ul className={styles.appointmentList}>
            {appointments.map((appointment) => (
              <li key={appointment.appId} className={styles.appointmentItem}>
                <AllPastAppointment appointment={appointment} />
              </li>
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

export default AllPastAppointmentList;
