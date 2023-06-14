import React, { useState, useEffect } from "react";
import "../CSS/PercentageBar.css";

const PercentageBar = ({ prop }) => {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      
      const totalCourses = document.querySelectorAll(".course-div");
      const greenCourses = document.querySelectorAll(".courseIsSelectedGreen");
      const totalCoursesLength = totalCourses.length;
      const greenCoursesLength = greenCourses.length;
      const newWidth = (greenCoursesLength / totalCoursesLength) * 100;
      setProgressWidth(newWidth);
      console.log(prop);
    }, 50);
  }, [prop]);

  return (
    <div className="percentage-bar">
      <div className="percentage-bar-box"></div>
      <div className="percentage-bar-content" style={{ width: `${progressWidth}%` }}>
        <div className="percentage-box">
          <div className="percentage-box1"></div>
          <div className="percentage-box2">{progressWidth.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
};

export default PercentageBar;
