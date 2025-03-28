import React, { useState } from "react";
import styles from "./DocProfileSidebar.module.css";
import { updateDoctor } from "../services/DoctorService";

const DocProfileSidebar = () => {
  const loggedDoc = JSON.parse(localStorage.getItem("logged_doctor"));

  const [isEditable, setIsEditable] = useState(false);
  const [docName, setdocName] = useState(loggedDoc.doctorName);
  const [docSpecial, setdocSpecial] = useState(loggedDoc.specialist);
  const [docPass, setdocPass] = useState(loggedDoc.doctorPass);
  const [docMail, setdocMail] = useState(loggedDoc.doctorMail);
  const [docAge, setdocAge] = useState(loggedDoc.doctorAge);
  const [docMobile, setdocMobile] = useState(loggedDoc.doctorMobile);
  const [docAddress, setdocAddress] = useState(loggedDoc.doctorAddress);
  const [docGender, setdocGender] = useState(loggedDoc.doctorGender);

  const handleSave = async () => {
    try {
      const updatedDoc = {
        doctorId: loggedDoc.doctorId,
        doctorName: docName,
        doctorMail: docMail,
        doctorPass: docPass,
        doctorAge: docAge,
        doctorGender: docGender,
        doctorMobile: docMobile,
        doctorAddress: docAddress,
        specialist: docSpecial,
      };
      await updateDoctor(updatedDoc);
      localStorage.setItem("logged_doctor", JSON.stringify(updatedDoc));
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.profilePic}>
        <img src="/image/login.png" alt="Profile Picture" />
      </div>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={docName}
            onChange={(e) => setdocName(e.target.value)}
            readOnly={!isEditable}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="special">Specialist</label>
          <input
            type="text"
            id="special"
            value={docSpecial}
            onChange={(e) => setdocSpecial(e.target.value)}
            readOnly={!isEditable}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={docAge}
            onChange={(e) => setdocAge(e.target.value)}
            readOnly={!isEditable}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={docMail}
            onChange={(e) => setdocMail(e.target.value)}
            readOnly={!isEditable}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            value={docMobile}
            onChange={(e) => setdocMobile(e.target.value)}
            readOnly={!isEditable}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={docAddress}
            onChange={(e) => setdocAddress(e.target.value)}
            readOnly={!isEditable}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={docGender}
            onChange={(e) => setdocGender(e.target.value)}
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

export default DocProfileSidebar;
