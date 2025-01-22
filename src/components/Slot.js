import React from "react";
import styles from "./Slot.module.css";

const Slot = ({ slot, bookedSlots }) => {
  return (
    <tr className={styles.slot}>
      <td>{slot.time}</td>
      {slot.isBreak ? (
        <td className={styles.break} colSpan="20">
          Lunch Break
        </td>
      ) : (
        Array.from({ length: 5 }).map((_, i) =>
          slot.miniSlots.map((time, idx) => {
            const isBooked = bookedSlots.has(time);
            return (
              <td
                key={`${i}-${idx}`}
                className={isBooked ? styles.booked : styles.available}
              >
                {time}
              </td>
            );
          })
        )
      )}
    </tr>
  );
};

export default Slot;
