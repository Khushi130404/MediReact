import React, { useEffect, useState } from "react";
import Slot from "./Slot";
import styles from "./AppointmentTable.module.css";

const AppointmentTable = () => {
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const generateTimeSlots = () => {
      const startHour = 9;
      const endHour = 19;
      const breakStart = 13;
      const breakEnd = 14;
      let slots = [];

      for (let hour = startHour; hour < endHour; hour++) {
        if (hour === breakStart) {
          slots.push({ time: "1:00 - 2:00 PM", isBreak: true });
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
  }, []);

  return (
    <div className={styles.app_tab}>
      <h2>Doctor's Appointment Timetable</h2>
      <table className={styles.timetable}>
        <thead>
          <tr>
            <th>Time</th>
            <th colSpan="4">Monday</th>
            <th colSpan="4">Tuesday</th>
            <th colSpan="4">Wednesday</th>
            <th colSpan="4">Thursday</th>
            <th colSpan="4">Friday</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, index) => (
            <Slot key={index} slot={slot} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
