import React from "react";
import "../CSS/GenerateButtons.css";
import IconBolt from "../../assets/IconBolt.svg";
import IconPlus from "../../assets/IconPlus.svg";


const GenerateButtons = () => {
  return (
    <div className="course-buttons-container">
      <div className="course-buttons">
        Generate Timetable <img src={IconBolt} alt="Lightning Bolt" />
      </div>
      <div className="course-buttons">
        Add More Courses <img src={IconPlus} alt="Plus" />
      </div>
    </div>
  );
};

export default GenerateButtons;
