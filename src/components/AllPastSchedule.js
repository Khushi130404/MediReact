import { useEffect, useState } from "react";
import styles from "./AllPastSchedule.module.css";
import { findUserById } from "../services/UserService";

const AllPastSchedule = ({ appointment }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userFetch = await findUserById(appointment.userId);
        setUser(userFetch);
      } catch (error) {
        console.error("Error fetching past appointments:", error);
      }
    };

    getUser();
  }, []);

  return (
    <>
      <li key={appointment.appId} className={styles.appointmentCard}>
        <p>
          <strong>Patient:</strong> {user.userName}
        </p>
        <p>
          <strong>Date:</strong> {appointment.date}
        </p>
        <p>
          <strong>Time:</strong> {appointment.startTime}
        </p>
        <p>
          <strong>Notes:</strong>
          {appointment.notes || " No additional notes"}
        </p>
      </li>
    </>
  );
};

export default AllPastSchedule;
