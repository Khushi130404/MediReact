import React, { useState } from "react";
import styles from "./AboutDoc.module.css";

const AboutDoc = ({ initialDoctor }) => {
  const [doctor, setDoctor] = useState(initialDoctor);

  const getGenderImage = (gender) => {
    if (gender.toLowerCase() === "male") {
      return "https://via.placeholder.com/150?text=Male+Doctor";
    } else if (gender.toLowerCase() === "female") {
      return "https://via.placeholder.com/150?text=Female+Doctor";
    } else {
      return "https://via.placeholder.com/150?text=Doctor";
    }
  };

  return (
    <div className={styles.aboutDoc}>
      <h2 className={styles.doctorName}>{doctor.doctorName}</h2>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src={getGenderImage(doctor.doctorGender)}
            alt="Doctor"
            className={styles.profileImage}
          />
        </div>
        <div className={styles.info}>
          <p>
            <strong>Specialist:</strong> {doctor.specialist}
          </p>
          <p>
            <strong>Age:</strong> {doctor.doctorAge}
          </p>
          <p>
            <strong>Gender:</strong> {doctor.doctorGender}
          </p>
          <p>
            <strong>Email:</strong> {doctor.doctorMail}
          </p>
          <p>
            <strong>Mobile:</strong> {doctor.doctorMobile}
          </p>
          <p>
            <strong>Address:</strong> {doctor.doctorAddress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutDoc;
