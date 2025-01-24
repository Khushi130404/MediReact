import Navbar from "./Navbar";
import Footer from "./Footer";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.contentWrapper}>
        <div className={styles.sidebar}>
          <ProfileSidebar />
        </div>
        <div className={styles.profileContent}>
          <ProfileContent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
