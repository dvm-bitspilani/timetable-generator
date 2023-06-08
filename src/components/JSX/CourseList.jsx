import React, { useState } from "react";
import IconCDCs from "../../assets/IconCDCs.svg";
import "../CSS/CourseList.css";
import CDCs from "./CDCs";
import MoreCourses from "./MoreCourses";
import FreeDay from "./FreeDay";
import PercentageBar from "./PercentageBar";
import GenerateButtons from "./GenerateButtons";

const CourseList = () => {
  const [freeDay, setFreeDay] = useState("");
  console.log(freeDay);

  return (
    <div className="course-list">
      <h2 className="courses-heading">
        <span>
          <img src={IconCDCs} alt="Icon" />
        </span>
        Your CDCs
      </h2>
      <CDCs />
      <div className="horizontal-line"></div>
      <h2 className="courses-heading">
        <span>
          <img src={IconCDCs} alt="Icon" />
        </span>
        More Courses
      </h2>
      <MoreCourses />
      <FreeDay setFreeDay={setFreeDay} />
      <PercentageBar />
      <GenerateButtons />
    </div>
  );
};

export default CourseList;
