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
  }, [appointment.userId]);

  return (
    <li key={appointment.appId} className={styles.appointmentCard}>
      <div className={styles.appointmentDetails}>
        <div className={styles.leftColumn}>
          <p>
            <strong>Patient: </strong> {user?.userName || " Loading..."}
          </p>
          <p>
            <strong>Date: </strong> {appointment.date}
          </p>
        </div>
        <div className={styles.rightColumn}>
          <p>
            <strong>Time: </strong> {appointment.startTime}
          </p>
          <p>
            <strong>Contact: </strong>
            {user?.userMobile || " Loading..."}
          </p>
        </div>
      </div>
    </li>
  );
};

export default AllPastSchedule;
