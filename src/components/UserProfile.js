import Navbar from "./Navbar";
import Footer from "./Footer";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";

const UserProfile = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <ProfileSidebar></ProfileSidebar>
        <ProfileContent></ProfileContent>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default UserProfile;
