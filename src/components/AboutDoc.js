import React, { useState, useEffect } from "react";
import styles from "./AboutDoc.module.css";
import { findAboutInfoByDocId } from "../services/AboutService";

const AboutDoc = ({ initialDoctor }) => {
  const [doctor, setDoctor] = useState(initialDoctor);
  const [docInfo, setDocInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const info = await findAboutInfoByDocId(doctor.doctorId);
        console.log("Fetched info:", info);
        if (info) {
          setDocInfo(info.about);
        } else {
          setDocInfo(null);
        }
      } catch (error) {
        setError("Error fetching doctor information");
        console.error("Error in try-catch block:", error);
      }
    };

    if (doctor.doctorId) {
      fetchInfo();
    }
  }, [doctor]);

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
            <strong>Age:</strong> {doctor.doctorAge}
          </p>
          {error && <p className={styles.errorMessage}>{error}</p>}
          {docInfo ? (
            <div>
              <p>{docInfo}</p>
            </div>
          ) : docInfo === null ? (
            <p>No additional information available for this doctor.</p>
          ) : (
            <p>Loading additional information...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutDoc;
