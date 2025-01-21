import React from "react";
import styles from "./Appointment.module.css";

const Slot = ({ slot }) => {
  return (
    <tr>
      <td>{slot.time}</td>
      {slot.isBreak ? (
        <td className={styles.break} colSpan="20">
          Lunch Break
        </td>
      ) : (
        Array.from({ length: 5 }).map((_, i) =>
          slot.miniSlots.map((time, idx) => <td key={`${i}-${idx}`}>{time}</td>)
        )
      )}
    </tr>
  );
};

export default Slot;
