import FutureAppointmentList from "./FutureAppointmentList";
import styles from "./ProfileContent.module.css";

const ProfileContent = () => {
  return (
    <div className={styles.profileContent}>
      <FutureAppointmentList></FutureAppointmentList>
    </div>
  );
};

export default ProfileContent;
