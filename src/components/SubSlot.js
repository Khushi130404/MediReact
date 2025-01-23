import React, { useState, useRef } from "react";
import {
  bookAppointment,
  deleteAppointment,
} from "../services/AppointmentService";
import styles from "./SubSlot.module.css";

const SubSlot = ({ time, isBooked, date, appObj, docId }) => {
  const loggedUser = JSON.parse(localStorage.getItem("logged_user"));
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState(""); // "book" or "delete"
  const slotRef = useRef(null);

  const calculateEndTime = (startTime) => {
    let [hours, minutes] = startTime.split(":").map(Number);
    minutes += 15;
    if (minutes >= 60) {
      hours += 1;
      minutes -= 60;
    }
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSlotClick = () => {
    if (!isBooked) {
      setPopupType("book");
      setShowPopup(true);
    } else if (loggedUser?.userId === appObj?.userId) {
      setPopupType("delete");
      setShowPopup(true);
    }
    // If booked by another user, do nothing
  };

  const handleBooking = async () => {
    if (!loggedUser) {
      alert("Please login to book a slot.");
      return;
    }

    const startTime = time;
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
      await bookAppointment(bookingData);
      setShowPopup(false);
      if (slotRef.current) slotRef.current.className = styles.my_slot;
    } catch (error) {
      console.error("Error booking slot:", error);
      alert("Failed to book the slot. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAppointment(appObj.appId);
      setShowPopup(false);
      if (slotRef.current) slotRef.current.className = styles.available;
    } catch (error) {
      console.error("Error deleting slot:", error);
      alert("Failed to delete the appointment. Please try again.");
    }
  };

  return (
    <>
      <td
        ref={slotRef}
        className={
          isBooked
            ? loggedUser?.userId === appObj?.userId
              ? styles.my_slot
              : styles.booked
            : styles.available
        }
        onClick={handleSlotClick}
      >
        {time}
      </td>

      {showPopup && (
        <>
          <div
            className={styles.popupOverlay}
            onClick={() => setShowPopup(false)}
          />
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              {popupType === "book" ? (
                <>
                  <h3>Confirm Booking</h3>
                  <p>
                    Are you sure you want to book this slot on <b>{date}</b> at{" "}
                    <b>{time}</b>?
                  </p>
                  <button className={styles.confirmBtn} onClick={handleBooking}>
                    Confirm
                  </button>
                </>
              ) : (
                <>
                  <h3>Confirm Deletion</h3>
                  <p>
                    Are you sure you want to <b>delete</b> your appointment on{" "}
                    <b>{date}</b> at <b>{time}</b>?
                  </p>
                  <button className={styles.confirmBtn} onClick={handleDelete}>
                    Yes, Delete
                  </button>
                </>
              )}
              <button
                className={styles.cancelBtn}
                onClick={() => setShowPopup(false)}
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
