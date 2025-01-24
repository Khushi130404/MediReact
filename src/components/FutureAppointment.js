import styles from "./FutureAppointment.module.css";

const FutureAppointment = ({ key, appointment }) => {
  return (
    <div className={styles.appointmentCard}>
      <p className={styles.appointmentText}>
        <span className={styles.bold}>Doctor ID:</span> {appointment.docId}
      </p>
      <p className={styles.appointmentText}>
        <span className={styles.bold}>Date:</span> {appointment.date}
      </p>
      <p className={styles.appointmentText}>
        <span className={styles.bold}>Start Time:</span> {appointment.startTime}
      </p>
      <p className={styles.appointmentText}>
        <span className={styles.bold}>End Time:</span> {appointment.endTime}
      </p>
    </div>
  );
};

export default FutureAppointment;
