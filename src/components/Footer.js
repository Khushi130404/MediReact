import React, { useRef } from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_in}>
        <div className={styles.footer_container}>
          <div className={styles.footerSection}>
            <h2 className={styles.footer_title}>
              <div className={styles.logoContainer}>
                <img src="/image/logo.png" alt="Logo" />
                MediCure
              </div>
            </h2>
            <p>
              MediCure is a comprehensive healthcare management system designed
              to streamline hospital operations and improve patient care. It
              provides a user-friendly interface for managing patient
              appointments.
            </p>
          </div>
          <div className={`${styles.footerSection} ${styles.footerMargin}`}>
            <h3>Navigation</h3>
            <ul className={styles.footer_navList}>
              <li>Home</li>
              <li>Profile</li>
              <li>Appointment</li>
              <li>About Us</li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Information</h3>
            <p>+91 7433933113</p>
            <p>medicure1304@gmail.com</p>
            <p>Vadodara, Gujarat, India</p>
          </div>
          <div className={styles.footerSection}>
            <h3>Contact Hours</h3>
            <p>Mon - Thu: 9:00 - 19:00</p>
            <p>Fri: 9:00 - 17:00</p>
            <p>Sat: 9:00 - 13:00</p>
            <p>Sun: Closed</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 All rights reserved | Block is made by Khushi Patel</p>
          <div className={styles.footer_socialIcons}>
            <img
              src="/image/facebook.svg"
              alt="Facebook"
              className="socialIcon"
            />
            <img
              src="/image/twitter.svg"
              alt="Twitter"
              className="socialIcon"
            />
            <img
              src="/image/instagram.svg"
              alt="Instagram"
              className="socialIcon"
            />
            <img
              src="/image/linkedin.svg"
              alt="LinkedIn"
              className="socialIcon"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
