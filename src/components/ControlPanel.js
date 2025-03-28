import React, { useState, useEffect } from "react";
import { showDoctor } from "../services/DoctorService";
import DocCard from "./DocCard";
import styles from "./ControlPanel.module.css";

const ControlPanel = () => {
  const [doctorInfoList, setDoctorInfoList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    doctorName: "",
    doctorMail: "",
    doctorAge: "",
    doctorMobile: "",
    doctorAddress: "",
    specialist: "",
  });

  const fetchDoctorInfo = async () => {
    try {
      const response = await showDoctor();
      if (Array.isArray(response)) {
        setDoctorInfoList(response);
      } else {
        setDoctorInfoList([]);
      }
    } catch (error) {
      console.error("Error fetching doctor info:", error);
    }
  };

  useEffect(() => {
    fetchDoctorInfo();
  }, []);

  const handleAddDoctor = async () => {
    // Implement the API call to add the new doctor here
    // After adding, refresh the doctor list
    fetchDoctorInfo();
    setIsAdding(false);
  };

  return (
    <div className={styles.controlPanel}>
      <h3>Doctor Info</h3>
      <img
        src="/image/addDoc.svg"
        className={styles.addButton}
        onClick={() => setIsAdding(true)}
        alt="Add Doctor"
      />
      <div className={styles.docGrid}>
        {doctorInfoList.length > 0 ? (
          doctorInfoList.map((doc) => (
            <DocCard
              key={doc.doctorId}
              doctor={doc}
              refreshDoctors={fetchDoctorInfo}
            />
          ))
        ) : (
          <p>No doctors available.</p>
        )}
      </div>

      {isAdding && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Add New Doctor</h3>
            <label>Name:</label>
            <input
              type="text"
              value={newDoctor.doctorName}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, doctorName: e.target.value })
              }
            />
            <label>Email:</label>
            <input
              type="email"
              value={newDoctor.doctorMail}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, doctorMail: e.target.value })
              }
            />
            <label>Age:</label>
            <input
              type="number"
              value={newDoctor.doctorAge}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, doctorAge: e.target.value })
              }
            />
            <label>Mobile:</label>
            <input
              type="text"
              value={newDoctor.doctorMobile}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, doctorMobile: e.target.value })
              }
            />
            <label>Address:</label>
            <input
              type="text"
              value={newDoctor.doctorAddress}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, doctorAddress: e.target.value })
              }
            />
            <label>Specialist:</label>
            <input
              type="text"
              value={newDoctor.specialist}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, specialist: e.target.value })
              }
            />

            <div className={styles.modalButtons}>
              <button className={styles.saveButton} onClick={handleAddDoctor}>
                Save
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsAdding(false)}
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

export default ControlPanel;
