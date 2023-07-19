import React, { useState, useEffect } from "react";
import styles from "../CSS/PercentageBar.module.css";
import styles2 from "../CSS/CDCs.module.css";


const PercentageBar = ({ prop }) => {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const totalCourses = document.querySelectorAll(`.${styles2["course-div"]}`);
      const greenCourses = document.querySelectorAll(`.${styles2["courseIsSelectedGreen"]}`);

      const totalCoursesLength = totalCourses.length;
      const greenCoursesLength = greenCourses.length;
      const newWidth = (greenCoursesLength / totalCoursesLength) * 100;
      setProgressWidth(newWidth);
    }, 50);
  
    return () => {
      clearInterval(interval);
    };
  }, [prop]);
  

  return (
    <div className={styles["percentage-bar"]}>
      <div className={styles["percentage-bar-box"]}></div>
      <div className={styles["percentage-bar-content"]} style={{ width: `${progressWidth}%` }}>
        <div className={styles["percentage-box"]}>
          <div className={styles["percentage-box1"]}></div>
          <div className={styles["percentage-box2"]}>{progressWidth.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
};

export default PercentageBar;
