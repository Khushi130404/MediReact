import React, { useEffect, useState } from "react";
import styles from "./DocList.module.css";

const DocList = ({ docList, onSelect }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleSelection = (event) => {
      console.log("Doctor selected:", event.detail);
    };

    window.addEventListener("doctorSelected", handleSelection);
    return () => {
      window.removeEventListener("doctorSelected", handleSelection);
    };
  }, []);

  if (!docList || docList.length === 0 || !isVisible) return null;

  const handleSelect = (doctor) => {
    const event = new CustomEvent("doctorSelected", { detail: doctor });
    window.dispatchEvent(event);
    onSelect(doctor);
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
              key={index}
              className={styles.menuItem}
              onClick={() => handleSelect(doctor)}
            >
              {doctor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DocList;
