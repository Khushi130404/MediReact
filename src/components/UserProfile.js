import Navbar from "./Navbar";
import Footer from "./Footer";
import ProfileSidebar from "./ProfileSidebar";
import ProfileContent from "./ProfileContent";

const UserProfile = () => {
  return (
    <div>
      <Navbar></Navbar>
      <ProfileSidebar></ProfileSidebar>
      <ProfileContent></ProfileContent>
      <Footer></Footer>
    </div>
  );
};

export default UserProfile;
