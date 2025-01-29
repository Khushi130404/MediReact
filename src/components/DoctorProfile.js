import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "./DoctorProfile.module.css";

const DoctorProfile = () => {
  return (
    <div className={styles.container}>
      <Navbar></Navbar>
      <div className={styles.contentWrapper}>
        <div className={styles.sidebar}>{/* <ProfileSidebar /> */}</div>
        {/* <div className={styles.profileContent}>
          <ProfileContent />
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default DoctorProfile;
