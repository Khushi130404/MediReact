import { useEffect, useState } from "react";
import styles from "./AllPastSchedule.module.css";
import { findUserById } from "../services/UserService";
import { addDiagnosis } from "../services/DiagnosisService";

const AllPastSchedule = ({ appointment }) => {
  const [user, setUser] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedByteArray, setSelectedByteArray] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userFetch = await findUserById(appointment.userId);
        setUser(userFetch);
      } catch (error) {
        console.error("Error fetching past appointments:", error);
      }
    };
    getUser();
  }, [appointment.userId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const arrayBuffer = reader.result;
        const byteArray = new Uint8Array(arrayBuffer);
        setSelectedByteArray(byteArray);
        console.log("Byte Array:", byteArray);
      };
    }
  };

  const handleAddDiagnosis = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("appointmentId", appointment.appId);
      console.log("Hey World");
      await addDiagnosis(appointment.appId, formData);
      alert("Diagnosis added successfully!");
      setSelectedFile(null);
      setPreviewURL(null);
      setSelectedByteArray(null);
    } catch (error) {
      console.error("Error uploading diagnosis:", error);
      alert("Failed to upload diagnosis.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <li key={appointment.appId} className={styles.appointmentCard}>
      <div className={styles.appointmentDetails}>
        <div className={styles.leftColumn}>
          <p>
            <strong>Patient: </strong> {user?.userName || " Loading..."}
          </p>
          <p>
            <strong>Date: </strong> {appointment.date}
          </p>
        </div>
        <div className={styles.rightColumn}>
          <p>
            <strong>Time: </strong> {appointment.startTime}
          </p>
          <p>
            <strong>Contact: </strong> {user?.userMobile || " Loading..."}
          </p>
        </div>
      </div>

      <div className={styles.diagnosisSection}>
        <button
          className={styles.addDiagnosisBtn}
          onClick={() =>
            document.getElementById(`fileInput-${appointment.appId}`).click()
          }
        >
          Add Diagnosis
        </button>

        <input
          id={`fileInput-${appointment.appId}`}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className={styles.hiddenInput}
        />

        {selectedFile && (
          <p className={styles.fileName}>Selected: {selectedFile.name}</p>
        )}

        {selectedFile && (
          <button
            className={styles.uploadDiagnosisBtn}
            onClick={handleAddDiagnosis}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Diagnosis"}
          </button>
        )}

        {previewURL && (
          <button
            className={styles.viewDiagnosisBtn}
            onClick={() => window.open(previewURL, "_blank")}
          >
            View Diagnosis
          </button>
        )}
      </div>
    </li>
  );
};

export default AllPastSchedule;
