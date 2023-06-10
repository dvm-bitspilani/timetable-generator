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

  const onCourseClick = () => {
    setCourseSelected(true);
  };
  const onCourseClickClose = () => {
    setCourseSelected(false);
  };
  const onAddMoreCourse = () =>{
    setAddMoreCourse(true);
  };
  const onAddMoreCourseBack = () =>{
    
    setAddMoreCourse(false);
  };
  

  // return (
  //   <>
  //     {courseSelected ? (
  //       <CourseDetail />
  //     ) : (
  //       <div className="course-list">
  //         <h2 className="courses-heading">
  //           <span>
  //             <img src={IconCDCs} alt="Icon" />
  //           </span>
  //           Your CDCs
  //         </h2>
  //         <CDCs onCourseClick={onCourseClick} />
  //         <div className="horizontal-line"></div>
  //         <h2 className="courses-heading">
  //           <span>
  //             <img src={IconCDCs} alt="Icon" />
  //           </span>
  //           More Courses
  //         </h2>
  //         <MoreCourses />
  //         <FreeDay setFreeDay={setFreeDay} />
  //         <PercentageBar />
  //         <GenerateButtons />
  //       </div>
  //     )}
  //   </>
  // );

  return (
    <>
      {courseSelected ? (
        <CourseDetail onCourseClickClose={onCourseClickClose} />
      ) : addMoreCourse ? (
        <AddMoreCourse onAddMoreCourseBack={onAddMoreCourseBack} />
      ) : (
        <div className="course-list">
          <h2 className="courses-heading">
            <span>
              <img src={IconCDCs} alt="Icon" />
            </span>
            Your CDCs
          </h2>
          <CDCs onCourseClick={onCourseClick} />
          <div className="horizontal-line"></div>
          <h2 className="courses-heading">
            <span>
              <img src={IconCDCs} alt="Icon" />
            </span>
            More Courses
          </h2>
          <MoreCourses onCourseClick={onCourseClick} />
          <FreeDay setFreeDay={setFreeDay} />
          <PercentageBar />
          <GenerateButtons onAddMoreCourse={onAddMoreCourse} />
        </div>
      )}
    </>
  );



};

export default CourseList;
