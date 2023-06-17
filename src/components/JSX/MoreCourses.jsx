import React, { useState, useEffect } from "react";
import IconBook from "../../assets/IconBook.svg";
import IconBookWhite from "../../assets/IconBookWhite.svg";
import "../CSS/CDCs.css";

const MoreCourses = ({ onCourseClick, courseIsSelectedGreen }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses =
      JSON.parse(localStorage.getItem("storedMoreCourses")) || [];
    setCourses(storedCourses);
  }, []);

  const courseClickUnique = (id) => {
    onCourseClick(id);
  };

  const wantedSections = JSON.parse(localStorage.getItem("wantedSections")) || [];
  const unWantedSections = JSON.parse(localStorage.getItem("unwantedSections")) || [];

  const getWantedSection = (title) => {
    const formattedTitle = title.replace(/\s/g, "");
    const courseRegex = new RegExp(`^..+-${formattedTitle}$`);
    let wantedArray = wantedSections.filter((section) =>
      courseRegex.test(section)
    );
    let formattedArray = wantedArray
      .map((section) => section.slice(0, 2))
      .join(", ");
    return formattedArray;
  };

  const getUnWantedSection = (title) => {
    const formattedTitle = title.replace(/\s/g, "");
    const courseRegex = new RegExp(`^..+-${formattedTitle}$`);
    let wantedArray = unWantedSections.filter((section) =>
      courseRegex.test(section)
    );
    let formattedArray = wantedArray
      .map((section) => section.slice(0, 3))
      .join(", ");
    return formattedArray;
  };

  return (
    <div className="courses-container">
      {courses.map((item) => (
        <div
          key={item.id}
          className={`course-div ${
            courseIsSelectedGreen(item.title) ? "courseIsSelectedGreen" : ""
          }`}
          onClick={() => courseClickUnique(item.title)}
        >
          <div className="course-div-overlay">
            <div className="course-overlay-content">
              {getWantedSection(item.title) != "" ? (
                <div className="want-content">
                  Want: {getWantedSection(item.title)}
                </div>
              ) : (
                ""
              )}
              {getUnWantedSection(item.title) != "" ? (
                <div className="want-content">
                  Don't Want: {getUnWantedSection(item.title)}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <img src={IconBookWhite} alt="book" />
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default MoreCourses;
