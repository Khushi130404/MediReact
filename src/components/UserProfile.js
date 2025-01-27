import Footer from "./Footer";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";
import styles from "./UserProfile.module.css";
import UserNavbar from "./UserNavbar";

const UserProfile = () => {
  return (
    <div className={styles.container}>
      <UserNavbar></UserNavbar>
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
