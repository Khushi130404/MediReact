import React, { useState, useEffect } from "react";
import { showDoctor } from "../services/DoctorService";
import DocCard from "./DocCard";
import styles from "./ControlPanel.module.css";

const ControlPanel = () => {
  const [doctorInfoList, setDoctorInfoList] = useState([]);

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

  return (
    <div className={styles.controlPanel}>
      <h3>Doctor Info</h3>
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
    </div>
  );
};

export default ControlPanel;
