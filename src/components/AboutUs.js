import React from "react";
import styles from "./AboutUs.module.css"; // Import CSS module
import Navbar from "./Navbar";
import Footer from "./Footer";
// import doctorImage from "../assets/doctors.jpg";

function AboutUs() {
  return (
    <div>
      <Navbar />

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
          <div className={styles.doctorList}>
            {/* Left: Combined Doctors Image */}
            {/* <div className={styles.doctorImageContainer}>
              <img src={doctorImage} alt="Our Expert Doctors" />
            </div> */}

            {/* Right: Doctor Details List */}
            <div className={styles.doctorDetailsList}>
              <div className={styles.doctorDetails}>
                <h3>Dr. Ria Mehta</h3>
                <p>Specialization: Dermatologist</p>
              </div>

              <div className={styles.doctorDetails}>
                <h3>Dr. Kunal Shah</h3>
                <p>Specialization: Orthopedic</p>
              </div>

              <div className={styles.doctorDetails}>
                <h3>Dr. Sneha Joshi</h3>
                <p>Specialization: Pediatrician</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;
