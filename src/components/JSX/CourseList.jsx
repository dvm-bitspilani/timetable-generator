import React, { useState } from "react";
import IconCDCs from "../../assets/IconCDCs.svg";
import "../CSS/CourseList.css";
import CDCs from "./CDCs";
import MoreCourses from "./MoreCourses";
import FreeDay from "./FreeDay";
import PercentageBar from "./PercentageBar";
import GenerateButtons from "./GenerateButtons";
import CourseDetail from "./CourseDetail";
import AddMoreCourse from "./AddMoreCourse";

const CourseList = () => {
  const [freeDay, setFreeDay] = useState("");
  console.log(freeDay);

  const [courseSelected, setCourseSelected] = useState(false);
  const [addMoreCourse, setAddMoreCourse] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const onCourseClick = (id) => {
    setCourseSelected(true);
    setSelectedCourseId(id);
  };
  const onCourseClickClose = () => {
    setCourseSelected(false);
    setSelectedCourseId(null);
  };
  const onCourseClickClose2 = (e) => {
    if (e.target === e.currentTarget) {
      setCourseSelected(false);
      setSelectedCourseId(null);
    }
  };
  const onCourseClickClose3 = (e) => {
    if (e.target === e.currentTarget) {
      setAddMoreCourse(false);
    }
  };
  const onAddMoreCourse = () =>{
    setAddMoreCourse(true);
  };
  const onAddMoreCourseBack = () =>{
    
    setAddMoreCourse(false);
  };
  
  let array = [
    { id: 1, title: "General Chemistry" },
    { id: 2, title: "General Biology" },
    { id: 3, title: "Mathematics 2" },
    { id: 4, title: "Workshop Practice" },
    { id: 5, title: "Mathematics 1" },
  ];


  return (
    <>
      {courseSelected ? (
        <CourseDetail onCourseClick={onCourseClick} onCourseClickClose={onCourseClickClose} onCourseClickClose2={onCourseClickClose2} courseId={selectedCourseId} courseArray={array} />
      ) : addMoreCourse ? (
        <AddMoreCourse onAddMoreCourseBack={onAddMoreCourseBack} onCourseClickClose3={onCourseClickClose3} />
      ) : (
        <div className="course-list">
          <h2 className="courses-heading">
            <span>
              <img src={IconCDCs} alt="Icon" />
            </span>
            Your CDCs
          </h2>
          <CDCs onCourseClick={onCourseClick} array={array} />
          <div className="horizontal-line"></div>
          <h2 className="courses-heading" id="more-courses-heading">
            <span>
              <img src={IconCDCs} alt="Icon" />
            </span>
            More Courses
          </h2>
          <MoreCourses onCourseClick={onCourseClick}  />
          <FreeDay setFreeDay={setFreeDay} />
          <PercentageBar />
          <GenerateButtons onAddMoreCourse={onAddMoreCourse} />
        </div>
      )}
    </>
  );



};

export default CourseList;
