import Footer from "./Footer";
import ProfileSidebar from "./UserProfileSidebar";
import ProfileContent from "./UserProfileContent";
import styles from "./UserProfile.module.css";
import Navbar from "./Navbar";

const UserProfile = () => {
  return (
    <div className={styles.container}>
      <Navbar></Navbar>
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
