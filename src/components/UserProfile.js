import Footer from "./Footer";
import UserProfileSidebar from "./UserProfileSidebar";
import UserProfileContent from "./UserProfileContent";
import styles from "./UserProfile.module.css";
import Navbar from "./Navbar";

const UserProfile = () => {
  return (
    <div className={styles.container}>
      <Navbar></Navbar>
      <div className={styles.contentWrapper}>
        <div className={styles.sidebar}>
          <UserProfileSidebar />
        </div>
        <div className={styles.profileContent}>
          <UserProfileContent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
