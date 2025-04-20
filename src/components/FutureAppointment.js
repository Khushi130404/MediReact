import { useEffect, useState } from "react";
import styles from "./FutureAppointment.module.css";
import { getDoctorById } from "../services/DoctorService";
import { deleteAppointment } from "../services/AppointmentService";

const FutureAppointment = ({ appointment, onDelete }) => {
  const [doctor, setDoctor] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      const doctorData = await getDoctorById(appointment.docId);
      setDoctor(doctorData);
    };

    fetchDoctor();
  }, [appointment.docId]);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      setShowConfirm(false);
      await deleteAppointment(appointment.appId);
      onDelete && onDelete(appointment.appId);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className={styles.appointmentCard}>
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

      <button className={styles.deleteButton} onClick={handleDeleteClick}>
        Delete Appointment
      </button>

      {showConfirm && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <p>Are you sure you want to delete this appointment?</p>
            <div className={styles.confirmActions}>
              <button onClick={confirmDelete} className={styles.confirmYes}>
                Yes
              </button>
              <button onClick={cancelDelete} className={styles.confirmNo}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FutureAppointment;
