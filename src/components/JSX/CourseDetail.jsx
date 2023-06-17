import React, { useState } from "react";
import "../CSS/CourseDetail.css";
import IconCross from "../../assets/IconCross.svg";
import LeftArrow from "../../assets/IconLeftArrow.svg";
import RightArrow from "../../assets/IconRightArrow.svg";
import Lectures from "./Lectures";
import Tutorials from "./Tutorials";

const CourseDetail = ({courseId,onCourseClickClose , onCourseClickClose2 , courseArray , onCourseClick }) =>{

  const [ lectureSelected , setLectureSelected ] = useState(true)

  const changeLectToTut = () =>{
    setLectureSelected(true);
  };
  const changeTutToLect = () =>{
    setLectureSelected(false);
  };

  const getNextCourseId = () => {
    const currentIndex = courseArray.findIndex((item) => item.title === courseId);
    const nextIndex = (currentIndex + 1) % courseArray.length;
    return courseArray[nextIndex].title;
  };
  const handleNextCourse = () => {
    const nextCourseId = getNextCourseId();
    onCourseClickClose();
    console.log(nextCourseId);
    onCourseClick(nextCourseId);
  };
  const getPreviousCourseId = () => {
    const currentIndex = courseArray.findIndex((item) => item.title === courseId);
    const previousIndex = (currentIndex - 1 + courseArray.length) % courseArray.length;
    return courseArray[previousIndex].title;
  };
  
  const handlePreviousCourse = () => {
    const previousCourseId = getPreviousCourseId();
    onCourseClickClose();
    onCourseClick(previousCourseId);
  };

  return(
  <div className="course-detail-invisible-container" onClick={onCourseClickClose2}>
    <div className="course-detail-container">
      <h3 className="course-detail-title">{courseId}</h3>
      <img src={IconCross} alt="Close" className="cross-icon" onClick={onCourseClickClose}/>
      {lectureSelected? <Lectures courseId={courseId} key={courseId} /> : <Tutorials key={courseId} courseId={courseId} /> }
      <div className="course-btns-container">
        <div className="prev-next-course-btn" onClick={handlePreviousCourse}><img src={LeftArrow} alt="Left Arrow" /> Previous Course</div>
        <div className="lecture-tut-btns">
          <div className={`lecture-btn ${lectureSelected? "lect-tut-selected" : ""}`} onClick={changeLectToTut}>Lectures</div>
          <div className={`lecture-btn ${!lectureSelected? "lect-tut-selected" : ""}`} onClick={changeTutToLect}>Tutorials</div>
        </div>
        <div className="prev-next-course-btn" onClick={handleNextCourse}>Next Course <img src={RightArrow} alt="" /></div>
      </div>
    </div>
  </div>
  );
};

export default CourseDetail;