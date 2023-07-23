import React, { useState, useEffect } from "react";
import styles from "../CSS/FreeDay.module.css";

const FreeDay = ({ setFreeDay }) => {
  const [selectedDay, setSelectedDay] = useState("");

  const handleClick = (e) => {
    const days = document.querySelectorAll(`.${styles["free-day-box"]} > div`);
    if (!e.target.className) {
      days.forEach((element) => {
        element.classList.remove(styles["selected-day"]);
      });
      e.target.classList.add(styles["selected-day"]);
      setSelectedDay(e.target.id);
      setFreeDay(e.target.id);
    } else {
      e.target.classList.remove(styles["selected-day"]);
      setSelectedDay("");
      setFreeDay("");
    }
  };

  useEffect(() => {
    const savedDay = localStorage.getItem("selectedDay");
    if (savedDay) {
      setSelectedDay(savedDay);
      setFreeDay(savedDay);
      const dayElement = document.getElementById(savedDay);
      if (dayElement) {
        const days = document.querySelectorAll(
          `.${styles["free-day-box"]} > div`
        );
        days.forEach((element) => {
          element.classList.remove(styles["selected-day"]);
        });
        dayElement.classList.add(styles["selected-day"]);
      }
    }
  }, [setFreeDay]);

  useEffect(() => {
    localStorage.setItem("selectedDay", selectedDay);
  }, [selectedDay]);

  return (
    <div className={styles["free-day-container"]}>
      <h1 className={styles["free-day-heading"]}>Free Day?</h1>
      <div className={styles["free-day-box"]} onClick={handleClick}>
        <div id="monday">M</div>
        <div id="tuesday">T</div>
        <div id="wednesday">W</div>
        <div id="thursday">Th</div>
        <div id="friday">F</div>
        <div id="saturday">S</div>
      </div>
    </div>
  );
};

export default FreeDay;
