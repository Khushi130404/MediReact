import { useEffect, useState } from "react";
import { getPastDocAppointment } from "../services/AppointmentService";
import styles from "./AllPastSchedule.module.css";

const AllPastSchedule = () => {
  const [appointments, setAppointments] = useState([]);
  const loggedDoc = JSON.parse(localStorage.getItem("logged_doc"));

  useEffect(() => {
    const fetchPastAppointments = async () => {
      try {
        const pastAppointments = await getPastDocAppointment(
          loggedDoc.doctorId
        );
        setAppointments(pastAppointments);
      } catch (error) {
        console.error("Error fetching past appointments:", error);
      }
    };

    fetchPastAppointments();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Past Appointments</h2>
      {appointments.length > 0 ? (
        <ul className={styles.appointmentList}>
          {appointments.map((appointment) => (
            <li key={appointment.appId} className={styles.appointmentCard}>
              <p>
                <strong>Patient:</strong> {appointment.patientName}
              </p>
              <p>
                <strong>Date:</strong> {appointment.date}
              </p>
              <p>
                <strong>Time:</strong> {appointment.time}
              </p>
              <p>
                <strong>Notes:</strong>{" "}
                {appointment.notes || "No additional notes"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noAppointments}>No past appointments found.</p>
      )}
    </div>
  );
};

export default AllPastSchedule;
