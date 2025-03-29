import { useEffect, useState } from "react";
import styles from "./AllPastSchedule.module.css";
import { findUserById } from "../services/UserService";
import { addDiagnosis, getDiagnosis } from "../services/DiagnosisService";

const AllPastSchedule = ({ appointment }) => {
  const [user, setUser] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [diagnosisURL, setDiagnosisURL] = useState(null);
  const [hasDiagnosis, setHasDiagnosis] = useState(false);
  const [showDiagnosis, setShowDiagnosis] = useState(false);

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

  useEffect(() => {
    const checkDiagnosis = async () => {
      try {
        const base64Image = await getDiagnosis(appointment.appId);
        if (base64Image) {
          setHasDiagnosis(true);
          setDiagnosisURL(`data:image/png;base64,${base64Image}`);
        }
      } catch (error) {
        setHasDiagnosis(false);
      }
    };
    checkDiagnosis();
  }, [appointment.appId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
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

      await addDiagnosis(appointment.appId, formData);
      alert("Diagnosis added successfully!");

      const reader = new FileReader();
      reader.onloadend = () => {
        setDiagnosisURL(reader.result);
        setHasDiagnosis(true);
      };
      reader.readAsDataURL(selectedFile);

      setSelectedFile(null);
      setPreviewURL(null);
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
            <strong>Patient:</strong> {user?.userName || "Loading..."}
          </p>
          <p>
            <strong>Date:</strong> {appointment.date}
          </p>
        </div>
        <div className={styles.rightColumn}>
          <p>
            <strong>Time:</strong> {appointment.startTime}
          </p>
          <p>
            <strong>Contact:</strong> {user?.userMobile || "Loading..."}
          </p>
        </div>
      </div>

      <div className={styles.diagnosisSection}>
        {!hasDiagnosis ? (
          <>
            <button
              className={styles.addDiagnosisBtn}
              onClick={() =>
                document
                  .getElementById(`fileInput-${appointment.appId}`)
                  .click()
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
          </>
        ) : (
          <>
            <button
              className={styles.showDiagnosisBtn}
              onClick={() => setShowDiagnosis(!showDiagnosis)}
            >
              {showDiagnosis ? "Hide Diagnosis" : "Show Diagnosis"}
            </button>

            {showDiagnosis && (
              <div className={styles.modalOverlay}>
                <div className={styles.modalContent}>
                  <span
                    className={styles.closeButton}
                    onClick={() => setShowDiagnosis(false)}
                  >
                    &times;
                  </span>
                  <img
                    src={diagnosisURL}
                    alt="Diagnosis"
                    className={styles.diagnosisImage}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </li>
  );
};

export default AllPastSchedule;
