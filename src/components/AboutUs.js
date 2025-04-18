import React, { useEffect, useState } from "react";
import styles from "./AboutUs.module.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Welcome from "./Welcome";

function AboutUs() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/doctor/show_doctor")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Error fetching doctor data:", err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.box}>
        <div className={styles.hero}>
          <div className={styles.title}>
            <div className={styles.textWelcome}>
              <div className={styles.textWrapperWelcome}>
                Welcome to MediCure
              </div>
              <p className={styles.divWelcome}>
                Your Trusted Partner in Healthcare
              </p>
            </div>
            <div className={styles.buttons}>
              <div className={styles.containerBook}>
                <p className={styles.animatedWord}>
                  Your Health, Our Priority - Every Step of the Way
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.about_container}>
        <div className={styles.header}>
          <div className={styles.intro}>
            <h1>About MediCure</h1>
            <p>Your Trusted Partner in Healthcare</p>
          </div>
          <div className={styles.tagline}>
            Your Health, Our Priority – Every Step of the Way.
          </div>
        </div>

        <div className={styles.section}>
          <h2>Who We Are</h2>
          <p>
            At MediCure, we are dedicated to providing high-quality,
            patient-centered healthcare services. Our innovative platform
            streamlines hospital operations, enhances patient experiences, and
            connects you with leading medical professionals. From booking
            appointments to accessing medical information, MediCure aims to make
            healthcare efficient, transparent, and accessible.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Vision & Mission</h2>
          <p>
            Our vision is to be recognized as a leader in healthcare technology,
            committed to improving the lives of patients by making healthcare
            seamless, modern, and accessible to all.
          </p>
          <ul className={styles.visionList}>
            <li>
              Empower patients with easy access to top medical professionals.
            </li>
            <li>Streamline hospital management for better efficiency.</li>
            <li>
              Enhance the overall patient care experience with technology-driven
              solutions.
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>Meet Our Expert Doctors</h2>
          <div className={styles.doctorDetailsList}>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <div key={doctor.doctorId} className={styles.doctorDetails}>
                  <h3>{doctor.doctorName}</h3>
                  <p>Specialization: {doctor.specialist}</p>
                </div>
              ))
            ) : (
              <p>Loading doctors...</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;
