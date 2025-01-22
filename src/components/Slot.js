import React from "react";
import styles from "./Slot.module.css"; // Import the Slot-specific styles

const Slot = ({ slot }) => {
  return (
    <tr className={styles.slot}>
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
