import React, { useEffect, useState } from "react";

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

  const renderTableRows = () => {
    return timeSlots.map((slot, index) => {
      return (
        <tr key={index}>
          <td>{slot.time}</td>
          {slot.isBreak ? (
            <td className="break" colSpan="20">
              Lunch Break
            </td>
          ) : (
            Array.from({ length: 5 }).map((_, i) =>
              slot.miniSlots.map((time, idx) => (
                <td key={`${i}-${idx}`}>{time}</td>
              ))
            )
          )}
        </tr>
      );
    });
  };

  return (
    <div>
      <h2>Doctor's Appointment Timetable</h2>
      <table className="timetable">
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
        <tbody>{renderTableRows()}</tbody>
      </table>

      <style jsx>{`
        .timetable {
          width: 90%;
          margin: 20px auto;
          border-collapse: collapse;
          background: white;
        }
        .timetable th,
        .timetable td {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: center;
        }
        .timetable th {
          background-color: #4caf50;
          color: white;
        }
        .break {
          background-color: #ffeb3b;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default AppointmentTable;
