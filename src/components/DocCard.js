import React from "react";
import styles from "./DocCard.module.css";

const DocCard = ({ doctor, onUpdate, onDelete }) => {
  if (!doctor) return null;

  return (
    <div className={styles.docCard}>
      <h2 className={styles.docTitle}>{doctor.doctorName}</h2>
      <p>
        <strong>Email:</strong> {doctor.doctorMail}
      </p>
      <p>
        <strong>Age:</strong> {doctor.doctorAge}
      </p>
      <p>
        <strong>Gender:</strong> {doctor.doctorGender}
      </p>
      <p>
        <strong>Mobile:</strong> {doctor.doctorMobile}
      </p>
      <p>
        <strong>Address:</strong> {doctor.doctorAddress}
      </p>
      <p>
        <strong>Specialist:</strong> {doctor.specialist}
      </p>
      <div className={styles.buttonContainer}>
        <button
          className={styles.updateButton}
          onClick={() => onUpdate(doctor)}
        >
          Update
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(doctor)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DocCard;
