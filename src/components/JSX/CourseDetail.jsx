import React, { useState, useEffect } from "react";
import "../CSS/CourseDetail.css";
import IconCross from "../../assets/IconCross.svg";
import LeftArrow from "../../assets/IconLeftArrow.svg";
import RightArrow from "../../assets/IconRightArrow.svg";
import Lectures from "./Lectures";
import Tutorials from "./Tutorials";
import Practicals from "./Practicals";

const CourseDetail = ({
  courseId,
  onCourseClickClose,
  onCourseClickClose2,
  fetchedArray,
  onCourseClick,
  sectionArray
}) => {
  const [courseArray, setCourseArray] = useState([]);
  // const [filteredSections, setFilteredSections] = useState(null);
  console.log(sectionArray);
  const filteredSections = sectionArray.filter(
    (item) => item.course_title === courseId
  );
  // setFilteredSections(filteredData);
  useEffect(() => {
    console.log("courseId:", courseId);
    console.log("sectionArray:", sectionArray);
  }, [courseId, sectionArray]);
  console.log(filteredSections);
  console.log(filteredSections[0]);
  console.log(filteredSections[0].lecture);
  console.log(courseId);
  useEffect(() => {
    const storedMoreCourses =
      JSON.parse(localStorage.getItem("storedMoreCourses")) || [];
    const fetchedCourseArray = fetchedArray.cdcs;
    setCourseArray([...fetchedCourseArray, ...storedMoreCourses]);
  }, [fetchedArray]);

  const [lectureSelected, setLectureSelected] = useState(true);
  const [tutorialSelected, setTutorialSelected] = useState(false);
  const [practicalSelected, setPracticalSelected] = useState(false);
  useEffect(() => {
    if (filteredSections && filteredSections[0].lecture.length > 0) {
      setLectureSelected(true);
      setPracticalSelected(false);
      setTutorialSelected(false);
    } else if (filteredSections && filteredSections[0].tutorial.length > 0) {
      setTutorialSelected(true);
      setLectureSelected(false);
      setPracticalSelected(false);
    } else if (filteredSections && filteredSections[0].practical.length > 0) {
      setTutorialSelected(false);
      setLectureSelected(false);
      setPracticalSelected(true);
    }
  }, [courseId]);
  
  

  const changeToLec = () => {
    setLectureSelected(true);
    setPracticalSelected(false);
    setTutorialSelected(false);
  };
  const changeToTut = () => {
    setTutorialSelected(true);
    setLectureSelected(false);
    setPracticalSelected(false);
  };
  const changeToPrac = () => {
    setTutorialSelected(false);
    setLectureSelected(false);
    setPracticalSelected(true);
  };

  const getNextCourseId = () => {
    const currentIndex = courseArray.findIndex(
      (item) => item.course_title === courseId
    );
    const nextIndex = (currentIndex + 1) % courseArray.length;
    return courseArray[nextIndex].course_title;
  };
  const handleNextCourse = () => {
    const nextCourseId = getNextCourseId();
    onCourseClickClose();
    onCourseClick(nextCourseId);
  };
  const getPreviousCourseId = () => {
    const currentIndex = courseArray.findIndex(
      (item) => item.course_title === courseId
    );
    const previousIndex =
      (currentIndex - 1 + courseArray.length) % courseArray.length;
    return courseArray[previousIndex].course_title;
  };

  const handlePreviousCourse = () => {
    const previousCourseId = getPreviousCourseId();
    onCourseClickClose();
    onCourseClick(previousCourseId);
  };

  return (
    <div
      className="course-detail-invisible-container"
      onClick={onCourseClickClose2}
    >
      <div className="course-detail-container">
        <h3 className="course-detail-title">{courseId}</h3>
        <img
          src={IconCross}
          alt="Close"
          className="cross-icon"
          onClick={onCourseClickClose}
        />
        { filteredSections && filteredSections[0].lecture.length >0 && lectureSelected && <Lectures courseId={courseId} key={courseId} fetchedArray={fetchedArray} sectionArray={sectionArray} />}
        { filteredSections && tutorialSelected &&  <Tutorials key={courseId} courseId={courseId} fetchedArray={fetchedArray} sectionArray={sectionArray} />}
        {filteredSections && practicalSelected && <Practicals key={courseId} courseId={courseId} fetchedArray={fetchedArray} sectionArray={sectionArray} />}
        <div className="course-btns-container">
          <div className="prev-next-course-btn" onClick={handlePreviousCourse}>
            <img src={LeftArrow} alt="Left Arrow" /> <p>Previous Course</p> 
          </div>
          <div className="lecture-tut-btns">
            {filteredSections && filteredSections[0].lecture.length >0 && <div
              className={`lecture-btn ${
                lectureSelected ? "lect-tut-selected" : ""
              }`}
              onClick={changeToLec}
            >
              Lectures
            </div>}
            {filteredSections && filteredSections[0].tutorial.length>0 && <div
              className={`lecture-btn ${
                tutorialSelected ? "lect-tut-selected" : ""
              }`}
              onClick={changeToTut}
            >
              Tutorials
            </div>}
          {filteredSections && filteredSections[0].practical.length>0 && <div
              className={`lecture-btn ${
                practicalSelected ? "lect-tut-selected" : ""
              }`}
              onClick={changeToPrac}
            >
              Practicals
            </div>}
          </div>
          <div className="prev-next-course-btn" onClick={handleNextCourse}>
           <p> Next Course</p> <img src={RightArrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
