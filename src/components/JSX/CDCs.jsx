import React from "react";
import IconBookWhite from "../../assets/IconBookWhite.svg";
import "../CSS/CDCs.css";

const CDCs = ({ onCourseClick, fetchedArray, courseIsSelectedGreen }) => {
  const courseClickUnique = (id) => {
    onCourseClick(id);
  };

  const wantedSections = JSON.parse(localStorage.getItem("wantedSections"));
  const unWantedSections = JSON.parse(localStorage.getItem("unwantedSections"));

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
      .map((section) => section.slice(0, 2))
      .join(", "); //Check for 2 digit sections
    return formattedArray;
  };

  return (
    <div className="courses-container">
      {fetchedArray?.cdcs?.map((item) => (
        <div
          key={item.course_id}
          className={`course-div ${
            courseIsSelectedGreen(item.course_title)
              ? "courseIsSelectedGreen"
              : ""
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
          <img src={IconBookWhite} alt="book" />
          <h3>{item.course_title}</h3>
        </div>
      ))}
    </div>
  );
};

export default CDCs;
