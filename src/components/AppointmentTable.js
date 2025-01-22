import React, { useEffect, useState } from "react";
import axios from "axios";
import Slot from "./Slot";
import styles from "./AppointmentTable.module.css";

const BASE_URL = "http://localhost:8080";
const GET_APPOINTMENT_API = `${BASE_URL}/appointment/show`;

const AppointmentTable = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [weekdays, setWeekdays] = useState([]);
  const [bookedSlots, setBookedSlots] = useState(new Set());

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(GET_APPOINTMENT_API);
        const booked = new Set(
          response.data.map((appointment) => appointment.time)
        );
        setBookedSlots(booked);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();

    const generateTimeSlots = () => {
      const startHour = 9;
      const endHour = 19;
      const breakStart = 13;
      let slots = [];

      for (let hour = startHour; hour < endHour; hour++) {
        if (hour === breakStart) {
          slots.push({ time: "13:00 - 14:00", isBreak: true });
          continue;
        }
        let miniSlots = ["00", "15", "30", "45"].map((min) => `${hour}:${min}`);
        slots.push({
          time: `${hour}:00 - ${hour + 1}:00`,
          miniSlots: miniSlots,
        });
      }
      return slots;
    };

    setTimeSlots(generateTimeSlots());

    const currentDay = new Date().getDay();
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const rotatedDays = [
      ...days.slice(currentDay - 1),
      ...days.slice(0, currentDay - 1),
    ];
    setWeekdays(rotatedDays);
  }, []);

  return (
    <div className={styles.app_tab}>
      <h2>Doctor's Appointment Timetable</h2>
      <table className={styles.timetable}>
        <thead>
          <tr>
            <th>Time</th>
            {weekdays.map((day, index) => (
              <th key={index} colSpan="4">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, index) => (
            <Slot key={index} slot={slot} bookedSlots={bookedSlots} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
