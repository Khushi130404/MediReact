import React, { useEffect, useState } from "react";
import { showDoctor } from "../services/DoctorService";
import styles from "./DocList.module.css";

const DocList = ({ onSelect }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [docList, setDocList] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctors = await showDoctor();
      console.log("Fetched doctors:", doctors);

      if (Array.isArray(doctors)) {
        setDocList(doctors);
      } else if (doctors && typeof doctors === "object") {
        // Convert the object to an array if needed
        setDocList([doctors]);
      } else {
        console.error("Unexpected response format:", doctors);
        setDocList([]);
      }
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

  const handleSelect = (doctor) => {
    if (doctor === null) {
      onSelect(false);
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
