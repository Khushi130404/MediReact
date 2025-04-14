import FutureAppointmentList from "./FutureAppointmentList";
import PastAppointmentList from "./PastAppointmentList";
import styles from "./UserProfileContent.module.css";

const UserProfileContent = () => {
  return (
    <div className={styles.profileContent}>
      <div className={styles.profContentDiv}>
        <FutureAppointmentList></FutureAppointmentList>
      </div>
      <div className={styles.profContentDiv}>
        <PastAppointmentList></PastAppointmentList>
      </div>
    </div>
  );
};

export default UserProfileContent;
