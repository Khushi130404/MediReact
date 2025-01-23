import React, { useState } from "react";
import { bookAppointment } from "../services/AppointmentService";
import styles from "./SubSlot.module.css";

const SubSlot = ({ time, isBooked, date, docId }) => {
  const loggedUser = JSON.parse(localStorage.getItem("logged_user"));
  const [showConfirm, setShowConfirm] = useState(false);

  const calculateEndTime = (startTime) => {
    let [hours, minutes] = startTime.split(":").map(Number);

    minutes += 15;
    if (minutes >= 60) {
      hours += 1;
      minutes -= 60;
    }

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  const handleBooking = async () => {
    if (!loggedUser) {
      alert("Please login to book a slot.");
      return;
    }

    const startTime = time;
    const [hours, minutes] = startTime.split(".").map(Number);
    const endTime = calculateEndTime(startTime);

    const bookingData = {
      appId: 0,
      docId: docId,
      userId: loggedUser.userId,
      startTime: startTime,
      endTime: endTime,
      date: date,
    };

    try {
      const response = await bookAppointment(bookingData);

      console.log(response.data);
      setShowConfirm(false);
    } catch (error) {
      console.error("Error booking slot:", error);
      alert("Failed to book the slot. Please try again.");
    }
  };

  return (
    <>
      <td
        className={isBooked ? styles.booked : styles.available}
        onClick={!isBooked ? () => setShowConfirm(true) : null}
      >
        {time}
      </td>

      {showConfirm && (
        <>
          <div
            className={styles.popupOverlay}
            onClick={() => setShowConfirm(false)}
          />
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <h3>Confirm Booking</h3>
              <p>
                Are you sure you want to book this slot on <b>{date}</b> at{" "}
                <b>{time}</b>?
              </p>
              <button className={styles.confirmBtn} onClick={handleBooking}>
                Confirm
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SubSlot;
