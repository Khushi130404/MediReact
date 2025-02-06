import styles from "./DoctorProfileContent.module.css";
import FutureScheduleList from "./FutureScheduleList";
import PastScheduleList from "./PastScheduleList";

const DoctorProfileContent = () => {
  return (
    <div className={styles.profileContent}>
      <div className={styles.profContentDiv}>
        <FutureScheduleList></FutureScheduleList>
      </div>
      <div className={styles.profContentDiv}>
        <PastScheduleList></PastScheduleList>
      </div>
    </div>
  );
};

export default DoctorProfileContent;
