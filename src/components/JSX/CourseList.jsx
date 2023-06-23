import React, { useState, useEffect } from "react";
import IconCDCs from "../../assets/IconCDCs.svg";
import "../CSS/CourseList.css";
import CDCs from "./CDCs";
import MoreCourses from "./MoreCourses";
import FreeDay from "./FreeDay";
import PercentageBar from "./PercentageBar";
import GenerateButtons from "./GenerateButtons";
import CourseDetail from "./CourseDetail";
import AddMoreCourse from "./AddMoreCourse";
import TimetableScreen from "./TimetableScreen";

const CourseList = ({fetchedArray , sectionArray, updateKey , key2 }) => {
  const [freeDay, setFreeDay] = useState("");

  const [timetableGenerated , setTimetableGenerated] = useState(false);

  const generateTimetable =()=>{
    setTimetableGenerated(true);
  };

  const storedMoreCourses = localStorage.getItem("storedMoreCourses");
  const storedMoreCoursesArray = JSON.parse(
    localStorage.getItem("storedMoreCourses")
  ) || [];
  const [ courseUnits, setCourseUnits ] = useState(0);
  useEffect(() => {
    const calculateCourseUnits = () => {
      let totalUnits = 0;
  
      fetchedArray.cdcs.forEach((element) => {
        totalUnits += element.credits;
      });
  
      storedMoreCoursesArray.forEach((element) => {
        const credits = parseInt(element.credits.slice(0,2).trim());
        totalUnits += credits;
      });
      setCourseUnits(totalUnits);
    };
  
    calculateCourseUnits();
  }, [ storedMoreCourses]);
  // console.log(courseUnits);
  // console.log(freeDay);
  // console.log(fetchedArray);
  // console.log(fetchedArray);
  // console.log(sectionArray);

  const [courseSelected, setCourseSelected] = useState(false);
  const [addMoreCourse, setAddMoreCourse] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const initialMoreCoursesAdded =
    storedMoreCourses !== null && JSON.parse(storedMoreCourses).length !== 0;

  const [moreCoursesAdded, setMoreCoursesAdded] = useState(initialMoreCoursesAdded);
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
    updateKey();
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
    if (!courseTitle) {
      return false;
    }
  
    const formattedCourseTitle = courseTitle.replace(/\s/g, "");
    const lecturePattern = new RegExp(`^L\\d{1,2}\\s-${formattedCourseTitle}-\\d+$`);
    const tutorialPattern = new RegExp(`^T\\d{1,2}\\s-${formattedCourseTitle}-\\d+$`);
    const practicalPattern = new RegExp(`^P\\d{1,2}\\s-${formattedCourseTitle}-\\d+$`);
  
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
    
    const hasPracticalCard =
      (wantedSections &&
        wantedSections.some((section) => practicalPattern.test(section))) ||
      (unWantedSections &&
        unWantedSections.some((section) => practicalPattern.test(section)));
  
    return hasLecturedCard || hasTutorialCard || hasPracticalCard;
  };
  

  return (

    <>
    {timetableGenerated && <TimetableScreen sectionArray={sectionArray} courseUnits={courseUnits} freeDay={freeDay} />}
    {!timetableGenerated && (<>
      {courseSelected ? (
        <CourseDetail
          onCourseClick={onCourseClick}
          onCourseClickClose={onCourseClickClose}
          onCourseClickClose2={onCourseClickClose2}
          courseId={selectedCourseId}
          fetchedArray={fetchedArray}
          sectionArray={sectionArray}
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
          <div className="course-list-cards">
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
          </div>
          <div className="course-list-footer">
          <FreeDay setFreeDay={setFreeDay} />
          <PercentageBar key={key2} prop={key2} />
          <GenerateButtons onAddMoreCourse={onAddMoreCourse} generateTimetable={generateTimetable} />
        </div>
        </div>
      )}
      </>)}
    </>
  );
};

export default CourseList;
