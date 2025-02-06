import { useEffect, useState } from "react";
import styles from "./PastSchedule.module.css";
import { findUserById } from "../services/UserService";

const PastAppointment = ({ appointment }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await findUserById(appointment.userId);
      setUser(userData);
    };

    console.log(appointment);
    fetchUser();
  }, [appointment.userId]);

  return (
    <div className={styles.appointmentCard}>
      <div className={styles.header}>
        <strong>{user ? user.userName : "Loading..."}</strong>
        <span className={styles.specialist}>
          {/* {user ? doctor.specialist : "Loading..."} */}
        </span>
      </div>
      <div className={styles.details}>
        <span>📅 {appointment.date}</span>
        <span>🕒 {appointment.startTime}</span>
      </div>
    </div>
  );
};

export default PastAppointment;
