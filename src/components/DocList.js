import React, { useState } from "react";
import styles from "./DocList.module.css";

const DocList = ({ docList, onSelect }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleSelect = (doctor) => {
    onSelect(doctor);
    setShowMenu(false);
  };

  return (
    <div className={styles.doc_list}>
      <button className={styles.button} onClick={() => setShowMenu(!showMenu)}>
        Choose Doctor
      </button>
      {showMenu && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupMenu}>
            <button
              className={styles.closeButton}
              onClick={() => setShowMenu(false)}
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
      )}
    </div>
  );
};

export default DocList;
