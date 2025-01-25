import FutureAppointmentList from "./FutureAppointmentList";
import PastAppointmentList from "./PastAppointmentList";
import styles from "./ProfileContent.module.css";

const ProfileContent = () => {
  return (
    <div className={styles.profileContent}>
      <FutureAppointmentList></FutureAppointmentList>
      <PastAppointmentList></PastAppointmentList>
    </div>
  );
};

export default ProfileContent;
