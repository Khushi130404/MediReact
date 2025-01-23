import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Welcome.module.css";
import DocList from "./DocList";

const Welcome = () => {
  const [showDocList, setShowDocList] = useState(false);
  const navigate = useNavigate();

  const handleBookingClick = () => {
    const loggedUser = JSON.parse(localStorage.getItem("logged_user"));

    if (!loggedUser) {
      navigate("/login"); // Redirect to login if not logged in
    } else {
      setShowDocList(true); // Show the doctor list if logged in
    }
  };

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
                onClick={handleBookingClick}
              >
                <p className={styles.animatedWord}>Book An Appointment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDocList && <DocList onSelect={() => setShowDocList(false)} />}
    </div>
  );
};

export default Welcome;
