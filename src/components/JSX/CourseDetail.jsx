import React, { useState, useEffect } from "react";
import styles from "../CSS/CourseDetail.module.css";
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
  const [want, setWant] = useState(true);

  console.log(sectionArray)
  console.log(courseId)
  const filteredSections = sectionArray.filter(
    (item) => item.course_title.replace(/\s+/g, ' ').trim() === courseId
  );

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
    setWant(true);
  };
  const changeToTut = () => {
    setTutorialSelected(true);
    setLectureSelected(false);
    setPracticalSelected(false);
    setWant(true);
  };
  const changeToPrac = () => {
    setTutorialSelected(false);
    setLectureSelected(false);
    setPracticalSelected(true);
    setWant(true);
  };

  const getNextCourseId = () => {
    const currentIndex = courseArray.findIndex(
      (item) => item.course_title.replace(/\s+/g, ' ').trim() === courseId
    );
    const nextIndex = (currentIndex + 1) % courseArray.length;
    return courseArray[nextIndex].course_title.replace(/\s+/g, ' ').trim();
  };
  const handleNextCourse = () => {
    const nextCourseId = getNextCourseId();
    onCourseClickClose();
    onCourseClick(nextCourseId);
    setWant(true);
  };
  const getPreviousCourseId = () => {
    const currentIndex = courseArray.findIndex(
      (item) => item.course_title.replace(/\s+/g, ' ').trim() === courseId
    );
    const previousIndex =
      (currentIndex - 1 + courseArray.length) % courseArray.length;
    return courseArray[previousIndex].course_title.replace(/\s+/g, ' ').trim();
  };

  const handlePreviousCourse = () => {
    const previousCourseId = getPreviousCourseId();
    onCourseClickClose();
    onCourseClick(previousCourseId);
    setWant(true);
  };

  console.log(filteredSections);
  console.log(filteredSections[0]);

  return (
    <div
      className={styles["course-detail-invisible-container"]}
      onClick={onCourseClickClose2}
    >
      <div className={styles["course-detail-container"]}>
        <h3 className={styles["course-detail-title"]}>{courseId}</h3>
        <p className={styles["instructions"]}>
          {want ? "Select the sections you want!" : "Select the sections you want to avoid!"}
        </p>
        <img
          src={IconCross}
          alt="Close"
          className={styles["cross-icon"]}
          onClick={onCourseClickClose}
        />
        { filteredSections && filteredSections[0].lecture.length >0 && lectureSelected && <Lectures courseId={courseId} key={courseId} fetchedArray={fetchedArray} sectionArray={sectionArray} want={want} setWant={setWant} />}
        { filteredSections && tutorialSelected &&  <Tutorials key={courseId} courseId={courseId} fetchedArray={fetchedArray} sectionArray={sectionArray} want={want} setWant={setWant} />}
        {filteredSections && practicalSelected && <Practicals key={courseId} courseId={courseId} fetchedArray={fetchedArray} sectionArray={sectionArray} want={want} setWant={setWant} />}
        <div className={styles["course-btns-container"]}>
          <div className={styles["prev-next-course-btn"]} onClick={handlePreviousCourse}>
            <img src={LeftArrow} alt="Left Arrow" /> <p>Previous Course</p> 
          </div>
          <div className={styles["lecture-tut-btns"]}>
            {filteredSections && filteredSections[0].lecture.length >0 && <div
              className={`${styles['lecture-btn']} ${
                lectureSelected ? styles["lect-tut-selected"] : ""
              }`}
              onClick={changeToLec}
            >
              <div className={styles["laptop-view-btns"]}>Lectures</div><div className={styles["mobile-view-btns"]}>L</div>
            </div>}
            {filteredSections && filteredSections[0].tutorial.length>0 && <div
              className={`${styles['lecture-btn']} ${
                tutorialSelected ? styles["lect-tut-selected"] : ""
              }`}
              onClick={changeToTut}
            >
              <div className={styles["laptop-view-btns"]}>Tutorials</div><div className={styles["mobile-view-btns"]}>T</div>
            </div>}
          {filteredSections && filteredSections[0].practical.length>0 && <div
              className={`${styles['lecture-btn']} ${
                practicalSelected ? styles["lect-tut-selected"] : ""
              }`}
              onClick={changeToPrac}
            >
              <div className={styles["laptop-view-btns"]}>Practicals</div><div className={styles["mobile-view-btns"]}>P</div>
            </div>}
          </div>
          <div className={styles["prev-next-course-btn"]} onClick={handleNextCourse}>
           <p> Next Course</p> <img src={RightArrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
