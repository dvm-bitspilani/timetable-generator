import React, { useState, useEffect } from "react";
import IconBook from "../../assets/IconBook.svg";
import IconBookWhite from "../../assets/IconBookWhite.svg";
import cross from "../../assets/IconCross.svg";
import styles from "../CSS/MoreCourses.module.css";

const MoreCourses = ({
  onCourseClick,
  courseIsSelectedGreen,
  sectionArray,
  setSectionArray,
  updateKey,
}) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses =
      JSON.parse(localStorage.getItem("storedMoreCourses")) || [];
    setCourses(storedCourses);
  }, []);

  const courseClickUnique = (id) => {
    onCourseClick(id);
  };

  function titleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        if (
          word.toLowerCase() === "ii" ||
          word.toLowerCase() === "iii" ||
          word.toLowerCase() === "iv" ||
          word.toLowerCase() === "v"
        ) {
          return word.toUpperCase();
        }
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  }

  const wantedSections =
    JSON.parse(localStorage.getItem("wantedSections")) || [];
  const unWantedSections =
    JSON.parse(localStorage.getItem("unwantedSections")) || [];

  const getWantedSection = (title) => {
    if (!title) {
      return "";
    }

    const formattedTitle = title.replace(/\s/g, "");
    const courseRegex = new RegExp(`^..+-${formattedTitle}`);
    let wantedArray = wantedSections.filter((section) =>
      courseRegex.test(section)
    );
    let formattedArray = wantedArray
      .map((section) => section.slice(0, 2))
      .join(", ");
    return formattedArray;
  };
  const getUnWantedSection = (title) => {
    if (!title) {
      return "";
    }

    const formattedTitle = title.replace(/\s/g, "");
    const courseRegex = new RegExp(`^..+-${formattedTitle}`);
    let unwantedArray = unWantedSections.filter((section) =>
      courseRegex.test(section)
    );
    let formattedArray = unwantedArray
      .map((section) => section.slice(0, 2))
      .join(", ");
    return formattedArray;
  };
  const deleteCourse = (courseId) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);
    localStorage.setItem("storedMoreCourses", JSON.stringify(updatedCourses));
    updateKey();
  };
  return (
    <div className={styles["courses-container"]}>
      {courses.map((item) => (
        <div
          key={item.id}
          className={`${styles["course-div"]} ${
            courseIsSelectedGreen(item.course_title)
              ? styles["courseIsSelectedGreen"]
              : ""
          }`}
          onClick={() => courseClickUnique(item.course_title)}
        >
          <div className={styles["course-div-overlay"]}>
            <div className={styles["course-overlay-content"]}>
              {getWantedSection(item.course_title) != "" ? (
                <div className={styles["want-content"]}>
                  Want: {getWantedSection(item.course_title)}
                </div>
              ) : (
                ""
              )}
              {getUnWantedSection(item.course_title) != "" ? (
                <div className={styles["want-content"]}>
                  Don't Want: {getUnWantedSection(item.course_title)}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={styles["course-div-main-content"]}>
            <img
              src={cross}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                deleteCourse(item.id);
              }}
              alt=""
              className={styles["crossicon"]}
            />
            <img className="course-book" src={IconBookWhite} alt="book" />
            <h3>{titleCase(item.course_title)}</h3>
          </div>
          <div className={styles["course-div-detail"]}>
            <h6>{item.course_no}</h6>
            <p>{item.credits}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoreCourses;
