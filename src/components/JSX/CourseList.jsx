import React from "react";
import IconCDCs from "../../assets/IconCDCs.svg";
import "../CSS/CourseList.css";
import CDCs from "./CDCs";
import MoreCourses from "./MoreCourses";
import FreeDay from "./FreeDay";
import PercentageBar from "./PercentageBar";
import GenerateButtons from "./GenerateButtons";

const CourseList = () =>{
  return(
    <>
      <h2 className="courses-heading"><span><img src={IconCDCs} alt="Icon" /></span>Your CDCs</h2>
      <CDCs />
      <div className="horizontal-line"></div>
      <h2 className="courses-heading"><span><img src={IconCDCs} alt="Icon" /></span>More Courses</h2>
      <MoreCourses />
      <FreeDay />
      <PercentageBar />
      <GenerateButtons />
    </>
  );
};

export default CourseList;