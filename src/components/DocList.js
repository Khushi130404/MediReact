import React, { useEffect, useState } from "react";
import { showDoctor } from "../services/DoctorService";
import styles from "./DocList.module.css";

const DocList = ({ onSelect }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [docList, setDocList] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctors = await showDoctor();
      if (Array.isArray(doctors)) {
        setDocList(doctors);
      } else {
        console.error("Fetched doctors are not an array:", doctors);
        setDocList([]); // Default to an empty array
      }
      console.log("Fetched doctors:", doctors);
    };

    fetchDoctors();

    const handleSelection = (event) => {
      console.log("Doctor selected:", event.detail);
    };

    window.addEventListener("doctorSelected", handleSelection);
    return () => {
      window.removeEventListener("doctorSelected", handleSelection);
    };
  }, []);

  // Ensure docList is an array and visible before rendering
  if (!Array.isArray(docList) || !isVisible) return null;

  const handleSelect = (doctor) => {
    if (doctor === null) {
      setIsVisible(false);
    } else {
      const event = new CustomEvent("doctorSelected", { detail: doctor });
      window.dispatchEvent(event);
      onSelect(doctor);
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
          {docList.map((doctor) => (
            <li
              key={doctor.doctorId}
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
