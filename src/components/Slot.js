import React from "react";
import SubSlot from "./SubSlot";
import styles from "./Slot.module.css";

const Slot = ({ slot, bookedSlots, weekdays, docId }) => {
  return (
    <tr className={styles.slot}>
      <td>{slot.time}</td>
      {slot.isBreak ? (
        <td className={styles.break} colSpan={weekdays.length * 4}>
          Lunch Break
        </td>
      ) : (
        weekdays.map((weekday, idx) => {
          return slot.miniSlots.map((time, subIdx) => {
            const key = `${weekday.date}-${time}`;
            const isBooked = bookedSlots.has(key);

            return (
              <SubSlot
                key={`${idx}-${subIdx}`}
                docId={docId}
                time={time}
                userId={bookedSlots.get(key)}
                date={weekday.date}
                isBooked={isBooked}
              />
            );
          });
        })
      )}
    </tr>
  );
};

export default Slot;
