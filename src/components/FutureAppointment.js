import { useEffect, useState } from "react";
import styles from "./FutureAppointment.module.css";
import { getDoctorById } from "../services/DoctorService";

const FutureAppointment = ({ appointment }) => {
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      const doctorData = await getDoctorById(appointment.docId);
      setDoctor(doctorData);
    };

    fetchDoctor();
  }, [appointment.docId]);

  return (
    <div className={styles.appointmentCard}>
      <div className={styles.header}>
        <strong>{doctor ? doctor.doctorName : "Loading..."}</strong>
        <span className={styles.specialist}>
          {doctor ? doctor.specialist : "Loading..."}
        </span>
      </div>
      <div className={styles.details}>
        <span>📅 {appointment.date}</span>
        <span>🕒 {appointment.startTime}</span>
      </div>
    </div>
  );
};

export default FutureAppointment;
