import React, { useState } from "react";
import styles from "./ProfileSidebar.module.css";
import { updateUser } from "../services/UserService";

const ProfileSidebar = () => {
  const loggedUser = JSON.parse(localStorage.getItem("logged_user"));

  const [isEditable, setIsEditable] = useState(false);
  const [userName, setUserName] = useState(loggedUser.userName);
  const [userMail, setUserMail] = useState(loggedUser.userMail);
  const [userAge, setUserAge] = useState(loggedUser.userAge);
  const [userMobile, setUserMobile] = useState(loggedUser.userMobile);
  const [userAddress, setUserAddress] = useState(loggedUser.userAddress);
  const [userGender, setUserGender] = useState(loggedUser.userGender);

  const handleSave = async () => {
    try {
      const updatedUser = {
        userId: loggedUser.userId,
        userName,
        userMail,
        userAge,
        userMobile,
        userAddress,
        userGender,
      };
      await updateUser(updatedUser);
      localStorage.setItem("logged_user", JSON.stringify(updatedUser));
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.profilePic}>
        <img src="placeholder.png" alt="Profile Picture" />
      </div>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            readOnly={!isEditable}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={userMail}
            onChange={(e) => setUserMail(e.target.value)}
            readOnly={!isEditable}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={userAge}
            onChange={(e) => setUserAge(e.target.value)}
            readOnly={!isEditable}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            value={userMobile}
            onChange={(e) => setUserMobile(e.target.value)}
            readOnly={!isEditable}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            readOnly={!isEditable}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={userGender}
            onChange={(e) => setUserGender(e.target.value)}
            disabled={!isEditable}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </form>
      <button
        className={styles.editProfile}
        onClick={isEditable ? handleSave : () => setIsEditable(true)}
      >
        {isEditable ? "Save Profile" : "Edit Profile"}
      </button>
    </div>
  );
};

export default ProfileSidebar;
