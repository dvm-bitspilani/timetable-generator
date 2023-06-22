import React from "react";
import "../CSS/GenerateButtons.css";
import IconBolt from "../../assets/IconBolt.svg";
import IconPlus from "../../assets/IconPlus.svg";


const GenerateButtons = ({onAddMoreCourse,generateTimetable}) => {
  return (
    <div className="course-buttons-container">
      <div className="course-buttons" onClick={generateTimetable}>
        Generate Timetable <img src={IconBolt} alt="Lightning Bolt" />
      </div>
      <div className="course-buttons" onClick={onAddMoreCourse}>
        Add More Courses <img src={IconPlus} alt="Plus" />
      </div>
    </div>
  );
};

export default GenerateButtons;
