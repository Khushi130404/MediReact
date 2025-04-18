import React, { useState } from "react";
import styles from "./AboutDoc.module.css";

const AboutDoc = ({ initialDoctor }) => {
  const [doctor, setDoctor] = useState(initialDoctor);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prevDoctor) => ({
      ...prevDoctor,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Doctor's Name: ${doctor.doctorName}`);
  };

  const getGenderImage = (gender) => {
    if (gender.toLowerCase() === "male") {
      return "https://via.placeholder.com/150?text=Male+Doctor";
    } else if (gender.toLowerCase() === "female") {
      return "https://via.placeholder.com/150?text=Female+Doctor";
    } else {
      return "https://via.placeholder.com/150?text=Doctor";
    }
  };

  return (
    <div className={styles.aboutDoc}>
      <h2>About the Doctor</h2>
      <img
        src={getGenderImage(doctor.doctorGender)}
        alt="Doctor"
        className={styles.profileImage}
      />
      <div className={styles.info}>
        <p>
          <strong>Name:</strong> {doctor.doctorName}
        </p>
        <p>
          <strong>Specialist:</strong> {doctor.specialist}
        </p>
        <p>
          <strong>Age:</strong> {doctor.doctorAge}
        </p>
        <p>
          <strong>Gender:</strong> {doctor.doctorGender}
        </p>
        <p>
          <strong>Email:</strong> {doctor.doctorMail}
        </p>
        <p>
          <strong>Mobile:</strong> {doctor.doctorMobile}
        </p>
        <p>
          <strong>Address:</strong> {doctor.doctorAddress}
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="doctorName">Update Name:</label>
        <input
          type="text"
          id="doctorName"
          name="doctorName"
          value={doctor.doctorName}
          onChange={handleInputChange}
          placeholder="Enter doctor's name"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AboutDoc;
