import React, { useState } from "react";
import styles from "./DocCard.module.css";
import { updateDoctor, deleteDoctor } from "../services/DoctorService";

const DocCard = ({ doctor, refreshDoctors }) => {
  // Move hooks to the top
  const [isEditing, setIsEditing] = useState(false);
  const [editedDoctor, setEditedDoctor] = useState(doctor || {}); // Handle the case when doctor is undefined

  if (!doctor) return null; // Safe to return here after defining hooks

  const handleUpdate = async () => {
    try {
      await updateDoctor(editedDoctor);
      alert("Doctor updated successfully!");
      setIsEditing(false);
      refreshDoctors();
    } catch (error) {
      alert("Failed to update doctor: " + error);
    }
  };

  return (
    <div className={styles.docCard}>
      <h2 className={styles.docTitle}>{doctor.doctorName}</h2>

      <div className={styles.detailsContainer}>
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
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.updateButton}
          onClick={() => setIsEditing(true)}
        >
          Update
        </button>
        <button className={styles.deleteButton} onClick={handleUpdate}>
          Delete
        </button>
      </div>

      {isEditing && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Edit Doctor Details</h3>
            <label>Name:</label>
            <input
              type="text"
              value={editedDoctor.doctorName || ""}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, doctorName: e.target.value })
              }
            />
            <label>Email:</label>
            <input
              type="email"
              value={editedDoctor.doctorMail || ""}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, doctorMail: e.target.value })
              }
            />
            <label>Age:</label>
            <input
              type="number"
              value={editedDoctor.doctorAge || ""}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, doctorAge: e.target.value })
              }
            />
            <label>Mobile:</label>
            <input
              type="text"
              value={editedDoctor.doctorMobile || ""}
              onChange={(e) =>
                setEditedDoctor({
                  ...editedDoctor,
                  doctorMobile: e.target.value,
                })
              }
            />
            <label>Address:</label>
            <input
              type="text"
              value={editedDoctor.doctorAddress || ""}
              onChange={(e) =>
                setEditedDoctor({
                  ...editedDoctor,
                  doctorAddress: e.target.value,
                })
              }
            />
            <label>Specialist:</label>
            <input
              type="text"
              value={editedDoctor.specialist || ""}
              onChange={(e) =>
                setEditedDoctor({ ...editedDoctor, specialist: e.target.value })
              }
            />

            <div className={styles.modalButtons}>
              <button className={styles.saveButton} onClick={handleUpdate}>
                Save
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocCard;
