import React, { useState } from "react";
import styles from "./Welcome.module.css";
import DocList from "./DocList";

const Welcome = () => {
  const [showDocList, setShowDocList] = useState(false);
  const docList = ["Dr. Smith", "Dr. Johnson", "Dr. Brown"]; // Example doctors

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
                <p className={styles.animatedWord}>Book An Appointment</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render DocList when showDocList is true */}
      {showDocList && (
        <DocList docList={docList} onSelect={() => setShowDocList(false)} />
      )}
    </div>
  );
};

export default Welcome;
