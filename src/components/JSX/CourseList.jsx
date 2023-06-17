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

const CourseList = ({fetchedArray}) => {
  const [freeDay, setFreeDay] = useState("");
  // console.log(freeDay);
  // console.log(fetchedArray);

  const [courseSelected, setCourseSelected] = useState(false);
  const [addMoreCourse, setAddMoreCourse] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const storedMoreCourses = localStorage.getItem("storedMoreCourses");
  const initialMoreCoursesAdded =
    storedMoreCourses !== null && JSON.parse(storedMoreCourses).length !== 0;

  const [moreCoursesAdded, setMoreCoursesAdded] = useState(initialMoreCoursesAdded);
  const [key , setKey] = useState(0);

  const updateKey = () => {
    setKey(prev=>prev+1);
  };
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
  const onAddMoreCourse = () => {
    setAddMoreCourse(true);
  };
  const onAddMoreCourseBack = () => {
    setAddMoreCourse(false);
  };
  const moreCourseAdded = () => {
    setMoreCoursesAdded(true);
  };
  const moreCourseNotAdded = () => {
    setMoreCoursesAdded(false);
  };

  const wantedSections = JSON.parse(localStorage.getItem("wantedSections"));
  const unWantedSections = JSON.parse(localStorage.getItem("unwantedSections"));

  const courseIsSelectedGreen = (courseTitle) => {
    const formattedCourseTitle = courseTitle.replace(/\s/g, "");
    const lecturePattern = new RegExp(`^L\\d+-${formattedCourseTitle}$`);
    const tutorialPattern = new RegExp(`^T\\d+-${formattedCourseTitle}$`);    

    const hasLecturedCard =
      (wantedSections &&
        wantedSections.some((section) => lecturePattern.test(section))) ||
      (unWantedSections &&
        unWantedSections.some((section) => lecturePattern.test(section)));

    const hasTutorialCard =
      (wantedSections &&
        wantedSections.some((section) => tutorialPattern.test(section))) ||
      (unWantedSections &&
        unWantedSections.some((section) => tutorialPattern.test(section)));

    return hasLecturedCard && hasTutorialCard;
  };

  return (
    <>
      {courseSelected ? (
        <CourseDetail
          onCourseClick={onCourseClick}
          onCourseClickClose={onCourseClickClose}
          onCourseClickClose2={onCourseClickClose2}
          courseId={selectedCourseId}
          courseArray={fetchedArray}
        />
      ) : addMoreCourse ? (
        <AddMoreCourse
          moreCourseAdded={moreCourseAdded}
          moreCourseNotAdded={moreCourseNotAdded}
          onAddMoreCourseBack={onAddMoreCourseBack}
          onCourseClickClose3={onCourseClickClose3}
          updateKey={updateKey}
          fetchedArray={fetchedArray}
        />
      ) : (
        <div className="course-list">
          <h2 className="courses-heading">
            <span>
              <img src={IconCDCs} alt="Icon" />
            </span>
            Your CDCs
          </h2>
          <CDCs
            onCourseClick={onCourseClick}
            fetchedArray={fetchedArray}
            courseIsSelectedGreen={courseIsSelectedGreen}
          />
          {moreCoursesAdded ? (
            <>
              <div className="horizontal-line"></div>
              <h2 className="courses-heading" id="more-courses-heading">
                <span>
                  <img src={IconCDCs} alt="Icon" />
                </span>
                More Courses
              </h2>
              <MoreCourses onCourseClick={onCourseClick} courseIsSelectedGreen={courseIsSelectedGreen} />
            </>
          ) : (
            ""
          )}
          <FreeDay setFreeDay={setFreeDay} />
          <PercentageBar key={key} prop={key} />
          <GenerateButtons onAddMoreCourse={onAddMoreCourse} />
        </div>
      )}
    </>
  );
};

export default CourseList;
