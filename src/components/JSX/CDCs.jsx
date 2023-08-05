import React, { useEffect, useState } from "react";
import IconBookWhite from "../../assets/IconBookWhite.svg";
import styles from "../CSS/CDCs.module.css";
import cross from "../../assets/IconCross.svg";

const CDCs = ({
  onCourseClick,
  fetchedArray,
  courseIsSelectedGreen,
  sectionArray,
  setSectionArray,
  setcdcsdetail,
  cdcsdetail,
}) => {
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
  // useEffect(() => {
  //   let cdcsContainer = document.querySelector("#cdc-course-container");
  //   console.log(cdcsContainer);
  //   cdcsContainer.style.display = 'flex';
  //   cdcsContainer.style.flexWrap = 'wrap';
  //   cdcsContainer.style.justifyContent = 'flex-start';
  // }, [sectionArray.length])

  const [checkSections, setCheckSections] = useState(false);
  const deleteCourse = (e) => {
    const targetDiv = e.currentTarget.parentElement.parentElement;
    targetDiv.className = `${styles["course-div"]}`;
    targetDiv.style.display = "none";
    const headingElement = targetDiv.querySelector("h3");
    if (headingElement) {
      const heading = headingElement.innerHTML.trim().toUpperCase();
      const deletedCDCs = JSON.parse(localStorage.getItem("deletedCDCs")) || [];

      if (!deletedCDCs.includes(heading)) {
        deletedCDCs.push(heading);
        localStorage.setItem("deletedCDCs", JSON.stringify(deletedCDCs));
      }
      if (Array.isArray(sectionArray)) {
        let sectionArrayNew = sectionArray.filter((course) => {
          return course.course_title.trim().toUpperCase() !== heading;
        });
        sectionArrayNew = sectionArrayNew.filter((course) => {
          return !deletedCDCs.includes(
            course.course_title.trim().toUpperCase()
          );
        });
        setSectionArray(sectionArrayNew);
      }
    }
    const resetButton = document.querySelector("#reset-btn");
    resetButton.style.display = "block";
  };

  useEffect(() => {
    const deletedCDCs = JSON.parse(localStorage.getItem("deletedCDCs")) || [];
    const headingElements = document.querySelectorAll("h3");

    headingElements.forEach((element) => {
      const heading = element.innerHTML.toUpperCase();
      if (deletedCDCs.includes(heading)) {
        const targetDiv = element.parentElement.parentElement;
        targetDiv.style.display = "none";
      }
    });

    // if (Array.isArray(sectionArray)) {
    //   let sectionArrayNew = sectionArray.filter((course) => {
    //     return !deletedCDCs.includes(course.course_title.trim().toUpperCase());
    //   });
    //   setSectionArray(sectionArrayNew);
    // }
  }, []);

  var deletedCDCs = JSON.parse(localStorage.getItem("deletedCDCs")) || [];

  useEffect(() => {
    const resetButton = document.querySelector("#reset-btn");
    const deletedCDCs = JSON.parse(localStorage.getItem("deletedCDCs")) || [];
    if (deletedCDCs.length <= 0) {
      resetButton.style.display = "none";
    }
    if (deletedCDCs.length > 0) {
      resetButton.style.display = "block";
    }
  }, []);
  const resetCourses = () => {
    const courseDivList = document.querySelectorAll("#cdc-div");
    for (let i of courseDivList) {
      i.style.display = "flex";
      i.className = `${styles["course-div"]} ${
        courseIsSelectedGreen(
          i.querySelector("h3").innerHTML.trim().toUpperCase()
        )
          ? checkSections
            ? ""
            : styles["courseIsSelectedGreen"]
          : ""
      }`;
    }
    localStorage.setItem("deletedCDCs", JSON.stringify([]));
    const resetButton = document.querySelector("#reset-btn");
    resetButton.style.display = "none";
    setSectionArray((prev) => [...prev, ...cdcsdetail]);
  };

  return (
    <div className="cdc-container">
      {" "}
      
      <div className={styles["courses-container"]}>
        {fetchedArray?.cdcs?.map((item) => (
          <div
            id="cdc-div"
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
      <div className={styles["cdc-reset"]}>
        <div
          id="reset-btn"
          className={styles["reset-btn"]}
          onClick={resetCourses}
        >
          Reset CDCs
        </div>
      </div>
    </div>
  );
};

export default CDCs;
