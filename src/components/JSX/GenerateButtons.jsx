import React from "react";
import styles from "../CSS/GenerateButtons.module.css";
import IconBolt from "../../assets/IconBolt.svg";
import IconPlus from "../../assets/IconPlus.svg";

const GenerateButtons = ({ onAddMoreCourse, generateTimetable }) => {
  return (
    <div className={styles["course-buttons-container"]}>
      <div className={styles["course-buttons"]} onClick={generateTimetable}>
        Generate Timetable <img src={IconBolt} alt="Lightning Bolt" />
      </div>
      <div className={styles["course-buttons"]} onClick={onAddMoreCourse}>
        Add More Courses <img src={IconPlus} alt="Plus" />
      </div>
    </div>
  );
};

export default GenerateButtons;
