import React, { useState, useRef } from "react";
import {
  bookAppointment,
  deleteAppointment,
} from "../services/AppointmentService";
import { findUserById } from "../services/UserService";
import styles from "./SubSlot.module.css";

const SubSlot = ({ time, isBooked, date, appObj, docId }) => {
  const loggedUser = JSON.parse(localStorage.getItem("logged_user"));
  const loggedDoc = JSON.parse(localStorage.getItem("logged_doctor"));
  const [showPopupUser, setShowPopupUser] = useState(false);
  const [showPopupDoc, setShowPopupDoc] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [user, setUser] = useState(null);
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
    if (loggedUser) {
      if (!isBooked) {
        setPopupType("book");
        setShowPopupUser(true);
      } else if (loggedUser?.userId === appObj?.userId) {
        setPopupType("delete");
        setShowPopupUser(true);
      }
    } else {
      if (isBooked) {
        displayAppointmentData();
      }
    }
  };

  const displayAppointmentData = async () => {
    try {
      const userTemp = await findUserById(appObj.userId);
      setUser(userTemp);
      setShowPopupDoc(true);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleBooking = async () => {
    if (loggedUser) {
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
        setShowPopupUser(false);
        if (slotRef.current) slotRef.current.className = styles.my_slot;
      } catch (error) {
        console.error("Error booking slot:", error);
        alert("Failed to book the slot. Please try again.");
      }
    } else {
      alert("Please login to book a slot.");
      return;
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAppointment(appObj.appId);
      setShowPopupUser(false);
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

      {showPopupUser && (
        <>
          <div
            className={styles.popupOverlay}
            onClick={() => setShowPopupUser(false)}
          />
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              {popupType === "book" ? (
                <>
                  <h3>Confirm Booking</h3>
                  <p>
                    Are you sure you want to book this slot on <b>{date}</b> at
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
                    Are you sure you want to <b>delete</b> your appointment on
                    <b>{date}</b> at <b>{time}</b>?
                  </p>
                  <button className={styles.confirmBtn} onClick={handleDelete}>
                    Yes, Delete
                  </button>
                </>
              )}
              <button
                className={styles.cancelBtn}
                onClick={() => setShowPopupUser(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
      {showPopupDoc && (
        <>
          <div
            className={styles.popupOverlay}
            onClick={() => setShowPopupDoc(false)}
          />
          <div className={styles.popup}>
            <div className={styles.popupContentDoc}>
              <h3>Appointment Details</h3>
              <p>
                <b>Patient :</b> {user?.userName}
              </p>
              <p>
                <b>Contact Info: </b> {user?.userMobile}
              </p>
              <p>
                <b>Duration:</b> {appObj?.startTime} to {appObj?.endTime}
              </p>
              <p>
                <b>Date:</b> {appObj?.date}
              </p>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowPopupDoc(false)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SubSlot;
