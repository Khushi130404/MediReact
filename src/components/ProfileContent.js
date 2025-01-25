import FutureAppointmentList from "./FutureAppointmentList";
import PastAppointmentList from "./PastAppointmentList";
import styles from "./ProfileContent.module.css";

const ProfileContent = () => {
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

export default ProfileContent;
