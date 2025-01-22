import React from "react";
import styles from "./SubSlot.module.css";

const SubSlot = ({ time, isBooked }) => {
  return (
    <td className={isBooked ? styles.booked : styles.available}>{time}</td>
  );
};

export default SubSlot;
