import React, { useState, useEffect } from "react";
import IconCDCs from "../../assets/IconCDCs.svg";
import styles from "../CSS/CourseList.module.css";
import CDCs from "./CDCs";
import MoreCourses from "./MoreCourses";
import FreeDay from "./FreeDay";
import PercentageBar from "./PercentageBar";
import GenerateButtons from "./GenerateButtons";
import CourseDetail from "./CourseDetail";
import AddMoreCourse from "./AddMoreCourse";
import TimetableScreen from "./TimetableScreen";
import backButton from "../../assets/IconBack.png";

const CourseList = ({
  fetchedArray,
  sectionArray,
  updateKey,
  key2,
  goToInput,
  setSectionArray,
}) => {
  const [freeDay, setFreeDay] = useState("");

  const [timetableGenerated, setTimetableGenerated] = useState(false);
  const closeTimetable = () => {
    setTimetableGenerated(false);
  };

  // const [requiredSections, setRequiredSections] = useState("");

  const storedMoreCourses = localStorage.getItem("storedMoreCourses");
  const storedMoreCoursesArray =
    JSON.parse(localStorage.getItem("storedMoreCourses")) || [];
  const [courseUnits, setCourseUnits] = useState(0);
  useEffect(() => {
    const calculateCourseUnits = () => {
      let totalUnits = 0;

      fetchedArray.cdcs.forEach((element) => {
        totalUnits += element.credits;
      });

      storedMoreCoursesArray.forEach((element) => {
        const credits = parseInt(element.credits.slice(0, 2).trim());
        totalUnits += credits;
      });
      setCourseUnits(totalUnits);
    };

    calculateCourseUnits();
  }, [storedMoreCourses]);

  const [creditsExceeded, setCreditsExceeded] = useState(false);

  useEffect(() => {
    if (courseUnits > 25) {
      setCreditsExceeded(true);
    } else {
      setCreditsExceeded(false);
    }
  }, [courseUnits]);
  const generateTimetable = () => {
    if (courseUnits <= 25) {
      setTimetableGenerated(true);
    } else {
      document.getElementsByClassName(styles["errorpara"])[0].innerHTML =
        "Please remove some courses to generate timetable!";
    }
  };

  const [courseSelected, setCourseSelected] = useState(false);
  const [addMoreCourse, setAddMoreCourse] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const initialMoreCoursesAdded =
    storedMoreCourses !== null && JSON.parse(storedMoreCourses).length !== 0;
  // useEffect(() => {
  //   setSelectedCourseId((prev) =>{
  //     if(prev){
  //     return prev.replace(/\s+/g, ' ').trim()}
  //     return;
  //   })
  // }, [ selectedCourseId]);

  console.log(sectionArray);

  const [moreCoursesAdded, setMoreCoursesAdded] = useState(
    initialMoreCoursesAdded
  );
  const onCourseClick = (id) => {
    setCourseSelected(true);
    setSelectedCourseId(id.replace(/\s+/g, " ").trim());
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
    const lecturePattern = new RegExp(
      `^L\\d{1,2}\\s-${formattedCourseTitle}-\\d+$`
    );
    const tutorialPattern = new RegExp(
      `^T\\d{1,2}\\s-${formattedCourseTitle}-\\d+$`
    );
    const practicalPattern = new RegExp(
      `^P\\d{1,2}\\s-${formattedCourseTitle}-\\d+$`
    );

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        generateTimetable();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {timetableGenerated && (
        <TimetableScreen
          closeTimetable={closeTimetable}
          sectionArray={sectionArray}
          courseUnits={courseUnits}
          freeDay={freeDay}
        />
      )}
      {!timetableGenerated && (
        <>
          {courseSelected ? (
            <CourseDetail
              onCourseClick={onCourseClick}
              onCourseClickClose={onCourseClickClose}
              onCourseClickClose2={onCourseClickClose2}
              courseId={selectedCourseId}
              fetchedArray={fetchedArray}
              sectionArray={sectionArray}
              // setRequiredSections={setRequiredSections}
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
            <div className={styles["course-list"]}>
              <img
                src={backButton}
                className="backButton"
                onClick={goToInput}
                alt=""
              />
              <div className={styles["course-list-cards"]}>
                <h2 className={styles["courses-heading"]}>
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
                    <div className={styles["horizontal-line"]}></div>
                    <h2
                      className={styles["courses-heading"]}
                      id="more-courses-heading"
                    >
                      <span>
                        <img src={IconCDCs} alt="Icon" />
                      </span>
                      More Courses
                    </h2>
                    <MoreCourses
                      onCourseClick={onCourseClick}
                      courseIsSelectedGreen={courseIsSelectedGreen}
                      sectionArray={sectionArray}
                      setSectionArray={setSectionArray}
                      updateKey={updateKey}
                    />
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className={styles["course-list-footer"]}>
                <FreeDay setFreeDay={setFreeDay} />
                <PercentageBar key={key2} prop={key2} />
                {creditsExceeded && (
                  <p className={styles["errorpara"]}>
                    You can not take more than 25 units worth of courses in a
                    single semester!
                  </p>
                )}
                <GenerateButtons
                  onAddMoreCourse={onAddMoreCourse}
                  generateTimetable={generateTimetable}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseList;
