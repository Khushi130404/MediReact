import React, { useEffect, useState } from "react";
import { getAppointment } from "../services/AppointmentService";
import Slot from "./Slot";
import styles from "./AppointmentTable.module.css";

const AppointmentTable = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [weekdays, setWeekdays] = useState([]);
  const [bookedSlots, setBookedSlots] = useState(new Set());

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAppointment();
        console.log(response);

        const booked = new Set(
          response.map((appointment) => appointment.startTime)
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

    const getNextWeekdays = () => {
      const currentDate = new Date();
      const weekdaysWithDates = [];
      const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ];

      let currentDayIndex = currentDate.getDay(); // Get today's day index (0-6)

      // Loop to collect the next 5 weekdays (skipping Saturday and Sunday)
      let weekdayCounter = 0;
      let dateCounter = 0; // Start from today's date
      while (weekdaysWithDates.length < 5) {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + dateCounter); // Increment the date

        const dayOfWeek = newDate.getDay(); // Get the day of the week (0-6)

        if (dayOfWeek === 6 || dayOfWeek === 0) {
          // Skip Saturday (6) and Sunday (0)
          dateCounter++;
          continue;
        }

        const weekdayName = daysOfWeek[dayOfWeek - 1]; // Get corresponding weekday name

        const formattedDate = `${String(newDate.getDate()).padStart(
          2,
          "0"
        )}-${String(newDate.getMonth() + 1).padStart(
          2,
          "0"
        )}-${newDate.getFullYear()}`;

        weekdaysWithDates.push({
          day: weekdayName,
          date: formattedDate,
        });

        dateCounter++;
      }

      setWeekdays(weekdaysWithDates);
    };

    getNextWeekdays();
  }, []);

  return (
    <div className={styles.app_tab}>
      <h2>Doctor's Appointment Timetable</h2>
      <table className={styles.timetable}>
        <thead>
          <tr>
            <th>Time</th>
            {weekdays.map((weekday, index) => (
              <th key={index} colSpan="4">
                {weekday.day} ({weekday.date})
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
