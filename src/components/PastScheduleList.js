import { useEffect, useState } from "react";
import { getPastDocAppointment } from "../services/AppointmentService";
import PastSchedule from "./PastSchedule";
import { useNavigate } from "react-router-dom";
import styles from "./PastScheduleList.module.css";

const PastScheduleList = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const loggedDoc = JSON.parse(localStorage.getItem("logged_doc"));
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const handleNavigate = (path) => {
    navigate(`${path}`);
  };

  const visibleAppointments =
    appointments.length > visibleCount
      ? [
          ...appointments.slice(startIndex, startIndex + visibleCount),
          ...appointments.slice(
            0,
            Math.max(0, startIndex + visibleCount - appointments.length)
          ),
        ]
      : appointments;

  const [autoSlide, setAutoSlide] = useState(null);

  const nextSlide = () => {
    if (appointments.length > visibleCount) {
      setStartIndex((prevIndex) => (prevIndex + 1) % appointments.length);
    }
  };

  const prevSlide = () => {
    if (appointments.length > visibleCount) {
      setStartIndex(
        (prevIndex) =>
          (prevIndex - 1 + appointments.length) % appointments.length
      );
    }
  };

  const resetAutoSlide = () => {
    if (autoSlide) clearInterval(autoSlide);
    if (appointments.length <= 1) return;

    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % appointments.length);
    }, 7000);

    setAutoSlide(interval);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const pastAppointments = await getPastDocAppointment(
          loggedDoc.doctorId
        );
        setAppointments(pastAppointments);

        if (pastAppointments.length > 1) {
          resetAutoSlide();
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (appointments.length > 1) {
      resetAutoSlide();
    }
  }, [appointments.length]);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Past Appointments</h2>
      {appointments.length > 0 ? (
        <div className={styles.appointmentsWrapper}>
          <button
            onClick={prevSlide}
            className={`${styles.navButton} ${styles.prevButton}`}
          >
            <img src="image/prev.svg" alt="Previous" />
          </button>
          {visibleAppointments.map((appointment) => (
            <PastSchedule
              key={appointment.appId}
              appointment={appointment}
              className={styles.appointmentCard}
            />
          ))}
          <button
            onClick={nextSlide}
            className={`${styles.navButton} ${styles.nextButton}`}
          >
            <img src="image/next.svg" alt="Next" />
          </button>
        </div>
      ) : (
        <p className={styles.noAppointments}>No past appointments found.</p>
      )}
      <button
        className={styles.moreAppLink}
        onClick={() => handleNavigate("/doctor/allPast")}
      >
        Checkout all past appointments here...
      </button>
    </div>
  );
};

export default PastScheduleList;
