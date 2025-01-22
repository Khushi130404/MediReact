import React, { useState } from "react";
import styles from "./Welcome.module.css";
import DocList from "./DocList";

const Welcome = () => {
  const [showDocList, setShowDocList] = useState(false);
  const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Brown"];

  return (
    <div>
      <div className={styles.box}>
        <div className={styles.hero}>
          <div className={styles.title}>
            <div className={styles.textWelcome}>
              <div className={styles.textWrapperWelcome}>
                Welcome to MediCure
              </div>
              <p className={styles.divWelcome}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda, voluptatum!
              </p>
            </div>
            <div className={styles.buttons}>
              <div
                className={styles.containerBook}
                onClick={() => setShowDocList(true)}
              >
                <a href="#" style={{ textDecoration: "none" }}>
                  <p className={styles.animatedWord}>Book An Appointment</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDocList && (
        <DocList
          docList={doctors}
          onSelect={(doctor) => alert(`Selected: ${doctor}`)}
        />
      )}
    </div>
  );
};

export default Welcome;
