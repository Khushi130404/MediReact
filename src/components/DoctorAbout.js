import React, { useEffect, useState } from "react";
import {
  findAboutInfoByDocId,
  updateAboutInfo,
} from "../services/AboutService";
import styles from "./DoctorAbout.module.css";

const DoctorAbout = () => {
  const loggedDoc = JSON.parse(localStorage.getItem("logged_doctor"));
  const [aboutText, setAboutText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tempText, setTempText] = useState("");

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

  const handleEditClick = () => {
    setTempText(aboutText);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempText("");
  };

  const handleSave = async () => {
    try {
      await updateAboutInfo(loggedDoc.doctorId, tempText);
      setAboutText(tempText);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update:", error);
      alert("Failed to update About info.");
    }
  };

  return (
    <div className={styles.docAboutContainer}>
      {!isEditing && (
        <img
          src="/image/editDoc.svg"
          alt="Edit"
          className={styles.editIcon}
          onClick={handleEditClick}
        />
      )}

      <h1 className={styles.header}>About Me : {loggedDoc?.doctorName}</h1>

      {isEditing ? (
        <>
          <textarea
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            className={styles.textarea}
            rows={6}
          />
          <div className={styles.buttonGroup}>
            <button className={styles.saveBtn} onClick={handleSave}>
              Save
            </button>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p className={styles.text}>{aboutText}</p>
      )}
    </div>
  );
};

export default DoctorAbout;
