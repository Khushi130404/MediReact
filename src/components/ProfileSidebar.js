import React, { useState } from "react";
import styles from "./ProfileSidebar.module.css";

const ProfileSidebar = () => {
  const [isEditable, setIsEditable] = useState(false);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.profilePic}>
        <img src="placeholder.png" alt="Profile Picture" />
      </div>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value="Burk Macklin"
            readOnly={!isEditable}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value="abc@gmail.com"
            readOnly={!isEditable}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <input type="number" id="age" value="35" readOnly={!isEditable} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            value="00923469874656"
            readOnly={!isEditable}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value="Street no. 4, XYZ"
            readOnly={!isEditable}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender</label>
          <input type="text" id="gender" value="Male" readOnly={!isEditable} />
        </div>
      </form>
      <button className={styles.editProfile} onClick={toggleEdit}>
        {isEditable ? "Save Profile" : "Edit Profile"}
      </button>
    </div>
  );
};

export default ProfileSidebar;
