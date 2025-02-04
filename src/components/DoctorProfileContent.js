import FutureAppointmentList from "./FutureAppointmentList";
import PastAppointmentList from "./PastAppointmentList";
import styles from "./DoctorProfileContent.module.css";

const DoctorProfileContent = () => {
  return (
    <div className={styles.profileContent}>
      <div className={styles.profContentDiv}>
        {/* <FutureAppointmentList></FutureAppointmentList> */}
      </div>
      <div className={styles.profContentDiv}>
        {/* <PastAppointmentList></PastAppointmentList> */}
      </div>
    </div>
  );
};

export default DoctorProfileContent;
