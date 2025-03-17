import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Welcome.module.css";
import DocList from "./DocList";

const Welcome = () => {
  const [showDocList, setShowDocList] = useState(false);
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("logged_user"));
  const loggedDoc = JSON.parse(localStorage.getItem("logged_doctor"));
  const loggedAdmin = JSON.parse(localStorage.getItem("logged_admin"));

  const handleBookingClick = () => {
    if (loggedUser) {
      setShowDocList(true);
    } else if (loggedDoc) {
      navigate("/doctor/schedule");
    } else {
      navigate("/login");
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
                Revolutionizing healthcare management with seamless integration,
                efficiency, and care – Medicure, where technology meets
                wellness.
              </p>
            </div>
            {!loggedDoc && !loggedAdmin && (
              <div className={styles.buttons}>
                <div
                  className={styles.containerBook}
                  onClick={handleBookingClick}
                >
                  <p className={styles.animatedWord}>Book An Appointment</p>
                </div>
              </div>
            )}
            {loggedDoc && (
              <div className={styles.buttons}>
                <div
                  className={styles.containerBook}
                  onClick={handleBookingClick}
                >
                  <p className={styles.animatedWord}>Doctor's Schedule</p>
                </div>
              </div>
            )}
            {loggedAdmin && (
              <div className={styles.buttons}>
                <div
                  className={styles.containerBook}
                  onClick={() => navigate("/admin/home")}
                >
                  <p className={styles.animatedWord}>Admin Panel</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showDocList && <DocList onSelect={() => setShowDocList(false)} />}
    </div>
  );
};

export default Welcome;
