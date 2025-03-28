import React, { useState, useEffect } from "react";
import { showDoctor, addDoctor } from "../services/DoctorService";
import DocCard from "./DocCard";
import styles from "./ControlPanel.module.css";

const ControlPanel = () => {
  const [doctorInfoList, setDoctorInfoList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    doctorId: 0,
    doctorName: "",
    doctorMail: "",
    doctorPass: "",
    doctorAge: "",
    doctorGender: "",
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
    try {
      const newDoctor2 = {
        doctorName: newDoctor.doctorName,
        doctorMail: newDoctor.doctorMail,
        doctorPass: newDoctor.doctorPass,
        doctorAge: parseInt(newDoctor.doctorAge),
        doctorGender: newDoctor.doctorGender,
        doctorMobile: newDoctor.doctorMobile,
        doctorAddress: newDoctor.doctorAddress,
        specialist: newDoctor.specialist,
      };
      await addDoctor(newDoctor2);
      await fetchDoctorInfo();
      setIsAdding(false);
      setNewDoctor({
        doctorId: "",
        doctorName: "",
        doctorMail: "",
        doctorPass: "",
        doctorAge: "",
        doctorGender: "",
        doctorMobile: "",
        doctorAddress: "",
        specialist: "",
      });
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
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
            <label>Password:</label>
            <input
              type="password"
              value={newDoctor.doctorPass}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, doctorPass: e.target.value })
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
            <label>Gender:</label>
            <select
              value={newDoctor.doctorGender}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, doctorGender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
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
