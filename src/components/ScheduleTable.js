import React, { useEffect, useState } from "react";
import { getDoctorAppointment } from "../services/AppointmentService";
import Slot from "./Slot";
import styles from "./ScheduleTable.module.css";

const ScheduleTable = ({ doctor }) => {
  const loggedDoc = JSON.parse(localStorage.getItem("logged_doctor"));
  const loggedAdmin = JSON.parse(localStorage.getItem("logged_admin"));
  const [timeSlots, setTimeSlots] = useState([]);
  const [weekdays, setWeekdays] = useState([]);
  const [bookedSlots, setBookedSlots] = useState(new Map());

  useEffect(() => {
    console.log("Khushi : " + loggedDoc);
    const fetchAppointments = async () => {
      try {
        const response = !!loggedAdmin
          ? await getDoctorAppointment(doctor.doctorId)
          : await getDoctorAppointment(loggedDoc.doctorId);
        const booked = new Map();
        response.forEach((appointment) => {
          const { startTime, date } = appointment;
          const key = `${date}-${startTime}`;
          booked.set(key, appointment);
        });
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

      let dateCounter = 0;
      while (weekdaysWithDates.length < 5) {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + dateCounter);

        const dayOfWeek = newDate.getDay();

        if (dayOfWeek === 6 || dayOfWeek === 0) {
          dateCounter++;
          continue;
        }

        const weekdayName = daysOfWeek[dayOfWeek - 1];

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
                {weekday.date}
                <br />
                {weekday.day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, index) => (
            <Slot
              key={index}
              docId={loggedAdmin ? doctor.doctorId : loggedDoc.doctorId}
              slot={slot}
              bookedSlots={bookedSlots}
              weekdays={weekdays}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
