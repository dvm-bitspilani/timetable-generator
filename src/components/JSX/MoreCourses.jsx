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

  function titleCase(str) {
    if (!str) {
      return '';
    }
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }
  

  const wantedSections = JSON.parse(localStorage.getItem("wantedSections")) || [];
  const unWantedSections = JSON.parse(localStorage.getItem("unwantedSections")) || [];

  const getWantedSection = (title) => {
    if (!title) {
      return '';
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
      return '';
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

  return (
    <div className="courses-container">
      {courses.map((item) => (
        <div
          key={item.id}
          className={`course-div ${
            courseIsSelectedGreen(item.course_title) ? "courseIsSelectedGreen" : ""
          }`}
          onClick={() => courseClickUnique(item.course_title)}
        >
          <div className="course-div-overlay">
            <div className="course-overlay-content">
              {getWantedSection(item.course_title) != "" ? (
                <div className="want-content">
                  Want: {getWantedSection(item.course_title)}
                </div>
              ) : (
                ""
              )}
              {getUnWantedSection(item.course_title) != "" ? (
                <div className="want-content">
                  Don't Want: {getUnWantedSection(item.course_title)}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="course-div-main-content">
            <img src={IconBookWhite} alt="book" />
            <h3>{titleCase(item.course_title)}</h3>
          </div>
          <div className="course-div-detail">
            <h6>{item.course_no}</h6>
            <p>{item.credits}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoreCourses;
