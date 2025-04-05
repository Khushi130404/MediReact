import React, { useEffect, useState } from "react";
import { findAboutInfoByDocId } from "../services/AboutService";

const DoctorAbout = () => {
  const loggedDoc = JSON.parse(localStorage.getItem("logged_doctor"));
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const aboutData = await findAboutInfoByDocId(loggedDoc.doctorId);
        setAboutText(aboutData.about);
      } catch (error) {
        console.error("Error fetching about info:", error);
        setAboutText("No About information available.");
      }
    };

    if (loggedDoc?.doctorId) {
      fetchAbout();
    }
  }, [loggedDoc?.doctorId]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Dr. {loggedDoc?.doctorName}</h1>
      <p style={styles.text}>{aboutText}</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#f4f4f8",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#4b0082",
    textAlign: "center",
  },
  text: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#333",
    textAlign: "justify",
  },
};

export default DoctorAbout;
