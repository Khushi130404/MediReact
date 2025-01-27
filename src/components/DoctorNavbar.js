import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./DoctorNavbar.module.css";
import DocList from "./DocList";

const DoctorNavbar = () => {
  const [showDocList, setShowDocList] = useState(false);
  const navigate = useNavigate();

  const handleBookingClick = () => {
    const loggedDoctor = JSON.parse(localStorage.getItem("logged_Doctor"));

    if (!loggedDoctor) {
      navigate("/login");
    } else {
      setShowDocList(true);
    }
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <h1 className={styles.logo}>
          <div className={styles.logoContainer}>
            <img src="/image/logo.png" alt="Logo" />
            MediCure
          </div>
        </h1>
        <ul className={styles.navLinks}>
          <li>
            <Link to="/" className={styles.navItem}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" className={styles.navItem}>
              Profile
            </Link>
          </li>
          <li onClick={handleBookingClick}>
            <Link className={styles.navItem}>Appointment</Link>
          </li>

          <li>
            <Link to="/register" className={styles.navItem}>
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className={styles.navItem}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.navItem}>
              About Us
            </Link>
          </li>
        </ul>
      </div>
      {showDocList && <DocList onSelect={() => setShowDocList(false)} />}
    </nav>
  );
};

export default DoctorNavbar;
