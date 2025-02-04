import { useEffect, useState } from "react";
import {
  getPastDocAppointment,
  getFutureDocAppointment,
} from "../services/AppointmentService";
import FutureSchedule from "./FutureSchedule";
import styles from "./FutureSchedule.module.css";

const FutureScheduleList = () => {
  const [appointments, setAppointments] = useState([]);
  const loggedDoc = JSON.parse(localStorage.getItem("logged_doc"));
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const [autoSlide, setAutoSlide] = useState(null);

  const nextSlide = () => {
    if (appointments.length > 0) {
      setStartIndex((prevIndex) => (prevIndex + 1) % appointments.length);
      resetAutoSlide();
    }
  };

  const prevSlide = () => {
    if (appointments.length > 0) {
      setStartIndex(
        (prevIndex) =>
          (prevIndex - 1 + appointments.length) % appointments.length
      );
      resetAutoSlide();
    }
  };

  const resetAutoSlide = () => {
    if (autoSlide) clearInterval(autoSlide);
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % appointments.length);
    }, 7000);
    setAutoSlide(interval);
  };

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const today = new Date();
        const futureAppointments = getFutureDocAppointment(loggedDoc.doctorId);
        // .sort((a, b) => {
        //   const dateA = parseDate(a.date);
        //   const dateB = parseDate(b.date);
        //   if (dateA.getTime() !== dateB.getTime()) {
        //     return dateA - dateB;
        //   }
        //   return a.startTime.localeCompare(b.startTime);
        // });

        setAppointments(futureAppointments);
        // if (futureAppointments.length > 1) {
        //   resetAutoSlide();
        // }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, [loggedDoc.doctorId]);

  useEffect(() => {
    if (appointments.length > 1) {
      resetAutoSlide();
    }
  }, [appointments.length]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Upcoming Appointments</h2>
      {appointments.length > 0 ? (
        <div className={styles.appointmentsWrapper}>
          <button
            onClick={prevSlide}
            className={`${styles.navButton} ${styles.prevButton}`}
          >
            <img src="image/prev.svg"></img>
          </button>
          {appointments
            .slice(startIndex, startIndex + visibleCount)
            .concat(
              appointments.slice(
                0,
                Math.max(0, startIndex + visibleCount - appointments.length)
              )
            )
            .map((appointment) => (
              <FutureSchedule
                key={appointment.appId}
                appointment={appointment}
                className={styles.appointmentCard}
              />
            ))}
          <button
            onClick={nextSlide}
            className={`${styles.navButton} ${styles.nextButton}`}
          >
            <img src="image/next.svg"></img>
          </button>
        </div>
      ) : (
        <p className={styles.noAppointments}>No future appointments found.</p>
      )}
    </div>
  );
};

export default FutureScheduleList;
