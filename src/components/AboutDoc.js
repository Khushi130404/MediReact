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
      <h2 className={styles.doctorName}>
        {doctor.doctorName} - {doctor.specialist}
      </h2>
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
            <strong>Specialist:</strong>
          </p>
          <p>
            <strong>Age:</strong> {doctor.doctorAge}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutDoc;
