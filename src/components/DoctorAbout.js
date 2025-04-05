import React, { useEffect, useState } from "react";
import { findAboutInfoByDocId } from "../services/AboutService";
import styles from "./DoctorAbout.module.css";

const DoctorAbout = () => {
  const loggedDoc = JSON.parse(localStorage.getItem("logged_doctor"));
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const aboutData = await findAboutInfoByDocId(loggedDoc.doctorId);
        setAboutText(aboutData.about);
      } catch (error) {
        console.error("Error fetching about info:", error);
        setAboutText("No About information available.");
      }
    };

    if (loggedDoc?.doctorId) {
      fetchAbout();
    }
  }, [loggedDoc?.doctorId]);

  return (
    <div className={styles.docAboutContainer}>
      <img
        src="/image/editDoc.svg"
        alt="Edit"
        className={styles.editIcon}
        onClick={() => alert("Edit coming soon!")}
      />
      <h1 className={styles.header}>About Me : {loggedDoc?.doctorName}</h1>
      <p className={styles.text}>{aboutText}</p>
    </div>
  );
};

export default DoctorAbout;
