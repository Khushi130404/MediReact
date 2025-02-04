import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "./DoctorProfile.module.css";
import DocProfileSidebar from "./DocProfileSidebar";
import DoctorProfileContent from "./DoctorProfileContent";

const DoctorProfile = () => {
  return (
    <div className={styles.container}>
      <Navbar></Navbar>
      <div className={styles.contentWrapper}>
        <div className={styles.sidebar}>
          <DocProfileSidebar></DocProfileSidebar>
        </div>
        <div className={styles.profileContent}>
          <DoctorProfileContent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorProfile;
