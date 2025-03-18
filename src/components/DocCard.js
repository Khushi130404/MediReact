import React from "react";

const DocCard = ({ doctor, onUpdate, onDelete }) => {
  if (!doctor) return null; // Avoids errors if doctor is undefined

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{doctor.doctorName}</h2>
      <p>
        <strong>Email:</strong> {doctor.doctorMail}
      </p>
      <p>
        <strong>Age:</strong> {doctor.doctorAge}
      </p>
      <p>
        <strong>Gender:</strong> {doctor.doctorGender}
      </p>
      <p>
        <strong>Mobile:</strong> {doctor.doctorMobile}
      </p>
      <p>
        <strong>Address:</strong> {doctor.doctorAddress}
      </p>
      <p>
        <strong>Specialist:</strong> {doctor.specialist}
      </p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => onUpdate(doctor)}>
          Update
        </button>
        <button
          style={{ ...styles.button, backgroundColor: "red" }}
          onClick={() => onDelete(doctor)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "1.5em",
    color: "#333",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
  },
  button: {
    padding: "8px 16px",
    fontSize: "1em",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
};

export default DocCard;
