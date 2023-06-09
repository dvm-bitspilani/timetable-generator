import React, { useState } from "react";
import "../CSS/CourseDetail.css";
import IconCross from "../../assets/IconCross.svg";
import LeftArrow from "../../assets/IconLeftArrow.svg";
import RightArrow from "../../assets/IconRightArrow.svg";
import Lectures from "./Lectures";
import Tutorials from "./Tutorials";

const CourseDetail = () =>{

  const [ lectureSelected , setLectureSelected ] = useState(true)

  const changeLectOrTut = () =>{
    if(lectureSelected){
      setLectureSelected(false);
    }else{
      setLectureSelected(true);
    }
  };

  return(
  <div className="course-detail-invisible-container">
    <div className="course-detail-container">
      <h3>General Chemistry</h3>
      <img src={IconCross} alt="Close" className="cross-icon" />
      {lectureSelected? <Lectures /> : <Tutorials /> }
      <div className="course-btns-container">
        <div className="prev-next-course-btn"><img src={LeftArrow} alt="Left Arrow" /> Previous Course</div>
        <div className="lecture-tut-btns">
          <div className="lecture-btn lect-tut-selected" onClick={changeLectOrTut}>Lectures</div>
          <div className="tut-btn" onClick={changeLectOrTut}>Tutorials</div>
        </div>
        <div className="prev-next-course-btn">Next Course <img src={RightArrow} alt="" /></div>
      </div>
    </div>
  </div>
  );
};

export default CourseDetail;