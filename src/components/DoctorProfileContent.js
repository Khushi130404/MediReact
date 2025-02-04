import styles from "./DoctorProfileContent.module.css";
import FutureScheduleList from "./FutureScheduleList";

const DoctorProfileContent = () => {
  return (
    <div className={styles.profileContent}>
      <div className={styles.profContentDiv}>
        <FutureScheduleList></FutureScheduleList>
      </div>
      <div className={styles.profContentDiv}>
        {/* <PastAppointmentList></PastAppointmentList> */}
      </div>
    </div>
  );
};

export default DoctorProfileContent;
