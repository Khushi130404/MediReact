import styles from "./AllPastSchedule.module.css";

const AllPastSchedule = ({ appointment }) => {
  return (
    <>
      <li key={appointment.appId} className={styles.appointmentCard}>
        <p>
          <strong>Patient:</strong> {appointment.userId}
        </p>
        <p>
          <strong>Date:</strong> {appointment.date}
        </p>
        <p>
          <strong>Time:</strong> {appointment.startTime}
        </p>
        <p>
          <strong>Notes:</strong>
          {appointment.notes || "No additional notes"}
        </p>
      </li>
    </>
  );
};

export default AllPastSchedule;
