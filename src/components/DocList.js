import React, { useEffect, useState } from "react";
import { showDoctor } from "../services/DoctorService";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./DocList.module.css";

const DocList = ({ onSelect }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [docList, setDocList] = useState([]);

  const navigate = useNavigate(); // Initialize navigate from useNavigate

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctors = await showDoctor();
      if (Array.isArray(doctors)) {
        setDocList(doctors);
      } else if (
        doctors &&
        typeof doctors === "object" &&
        Object.keys(doctors).length > 0
      ) {
        setDocList([doctors]);
      } else {
        console.error("Unexpected response format:", doctors);
        setDocList([]);
      }
    };

    fetchDoctors();
  }, []);

  const handleSelect = (doctor) => {
    if (doctor === null) {
      onSelect(false);
    } else {
      const event = new CustomEvent("doctorSelected", { detail: doctor });
      window.dispatchEvent(event);
      onSelect(doctor);
      navigate("/appointment", { state: { doctor } });
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupMenu}>
        <button
          className={styles.closeButton}
          onClick={() => handleSelect(null)}
        >
          ✖
        </button>
        <ul className={styles.menuList}>
          {docList.map((doctor, index) => (
            <li
              key={doctor.doctorId || index}
              className={styles.menuItem}
              onClick={() => handleSelect(doctor)}
            >
              {doctor.doctorName} - {doctor.specialist}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocList;
