import React, { useEffect, useState } from "react";
import Slot from "./Slot";
import styles from "./AppointmentTable.module.css";

const AppointmentTable = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [weekdays, setWeekdays] = useState([]);

  useEffect(() => {
    const generateTimeSlots = () => {
      const startHour = 9;
      const endHour = 19;
      const breakStart = 13;
      const breakEnd = 14;
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
            <Slot key={index} slot={slot} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;
