import { useEffect, useState } from "react";
import styles from "./AllPastAppointment.module.css";
import { getDoctorById } from "../services/DoctorService";
import { addDiagnosis, getDiagnosis } from "../services/DiagnosisService";

const AllPastAppointment = ({ appointment }) => {
  const [doctor, setDoctor] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [diagnosisURL, setDiagnosisURL] = useState(null);
  const [hasDiagnosis, setHasDiagnosis] = useState(false);
  const [showDiagnosis, setShowDiagnosis] = useState(false);

  useEffect(() => {
    const getDoctor = async () => {
      try {
        const doctorFetch = await getDoctorById(appointment.docId);
        setDoctor(doctorFetch);
      } catch (error) {
        console.error("Error fetching past appointments:", error);
      }
    };
    getDoctor();
  }, [appointment.docId]);

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

  const downloadImage = (imageURL) => {
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "diagnosis.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <div>
        <div className={styles.header}>
          <strong>{doctor ? doctor.doctorName : "Loading..."}</strong>
          <span className={styles.specialist}>
            {doctor ? doctor.specialist : "Loading..."}
          </span>
        </div>
        <div className={styles.details}>
          <span>📅 {appointment.date}</span>
          <span>🕒 {appointment.startTime}</span>
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
              className={styles.viewDiagnosisBtn}
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

                  <div className={styles.modalButtons}>
                    <button
                      className={styles.downloadBtn}
                      onClick={() => downloadImage(diagnosisURL)}
                    >
                      Download
                    </button>
                    <button
                      className={styles.cancelBtn}
                      onClick={() => setShowDiagnosis(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </li>
  );
};

export default AllPastAppointment;
