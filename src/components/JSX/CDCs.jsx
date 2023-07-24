import React, { useEffect, useState } from "react";
import IconBookWhite from "../../assets/IconBookWhite.svg";
import styles from "../CSS/CDCs.module.css";
import cross from "../../assets/IconCross.svg";

const CDCs = ({ onCourseClick, fetchedArray, courseIsSelectedGreen , sectionArray,setSectionArray }) => {
  const courseClickUnique = (id) => {
    onCourseClick(id);
  };

  function titleCase(str) {
    let fstr = str.replace(/\s+/g, " ").trim();
    return fstr
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

    // return str;
  }

  const wantedSections =
    JSON.parse(localStorage.getItem("wantedSections")) || [];
  const unWantedSections =
    JSON.parse(localStorage.getItem("unwantedSections")) || [];

  const getWantedSection = (title) => {
    const formattedTitle = title.replace(/\s/g, "");
    const courseRegex = new RegExp(`^..+-${formattedTitle}`);
    let wantedArray = wantedSections.filter((section) =>
      courseRegex.test(section)
    );
    let formattedArray = wantedArray
      .map((section) => section.slice(0, 3))
      .join(", ");
    let sectionCheckArray = wantedArray.map((item) => item.slice(0, 1));

    return formattedArray;
  };

  const getUnWantedSection = (title) => {
    const formattedTitle = title.replace(/\s/g, "");
    const courseRegex = new RegExp(`^..+-${formattedTitle}`);
    let wantedArray = unWantedSections.filter((section) =>
      courseRegex.test(section)
    );
    let formattedArray = wantedArray
      .map((section) => section.slice(0, 3))
      .join(", ");
    let sectionCheckArray = wantedArray.filter(
      (item, index) => wantedArray.indexOf(item.slice(0, 2)) === index
    );

    return formattedArray;
  };

  const [checkSections, setCheckSections] = useState(false);
  const deleteCourse = (e) => {
    // Find the parent div of the course to be deleted
    const targetDiv = e.currentTarget.parentElement.parentElement;
    targetDiv.style.display = "none";
  
    // Find the heading of the deleted course
    const headingElement = targetDiv.querySelector('h3');
    if (headingElement) {
      const heading = headingElement.innerHTML.trim().toUpperCase();
      const deletedCDCs = JSON.parse(localStorage.getItem('deletedCDCs')) || [];
  
      if (!deletedCDCs.includes(heading)) {
        deletedCDCs.push(heading);
        localStorage.setItem('deletedCDCs', JSON.stringify(deletedCDCs));
      }
  
      // Remove the deleted course from the sectionArray
      if (Array.isArray(sectionArray)) {
        let sectionArrayNew = sectionArray.filter((course) => {
          return course.course_title.trim().toUpperCase() !== heading;
        });
  
        // Remove all items from sectionArray that are also in deletedCDCs
        sectionArrayNew = sectionArrayNew.filter((course) => {
          console.log(course)
          return !deletedCDCs.includes(course.course_title.trim().toUpperCase());
        });
  
        setSectionArray(sectionArrayNew);
      }
    }
  };
  

  // console.log(sectionArray)
  
  
  useEffect(() => {
    const deletedCDCs = JSON.parse(localStorage.getItem('deletedCDCs')) || [];
    const headingElements = document.querySelectorAll('h3');

    headingElements.forEach((element) => {
      const heading = element.innerHTML.toUpperCase();
      if (deletedCDCs.includes(heading)) {
        const targetDiv = element.parentElement.parentElement;
        targetDiv.style.display = 'none';
      }
    });

    // Remove the deleted courses from sectionArray
    if (Array.isArray(sectionArray)) {
      let sectionArrayNew = sectionArray.filter((course) => {
        return !deletedCDCs.includes(course.course_title.trim().toUpperCase());
      });
      setSectionArray(sectionArrayNew);
    }
  }, []);
  
  return (
    <div className={styles["courses-container"]}>
      {fetchedArray?.cdcs?.map((item) => (
        <div
          key={item.course_id}
          className={`${styles["course-div"]} ${
            courseIsSelectedGreen(item.course_title)
              ? checkSections
                ? ""
                : styles["courseIsSelectedGreen"]
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
                deleteCourse(e);
              }}
              alt=""
              className={styles["crossicon"]}
            />
            <img src={IconBookWhite} alt="book" />
            <h3>{titleCase(item.course_title)}</h3>
          </div>
          <div className={styles["course-div-detail"]}>
            <h6>{item.course_no}</h6>
            <p>{item.credits} Credits</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CDCs;
