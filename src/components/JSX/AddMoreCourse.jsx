import React, { useState, useEffect } from "react";
import styles from "../CSS/AddMoreCourse.module.css";
import IconSearch from "../../assets/IconSearch.svg";
import Oops from "../../assets/NoCourseError.svg";

const AddMoreCourse = ({
  onAddMoreCourseBack,
  moreCourseNotAdded,
  moreCourseAdded,
  onCourseClickClose3,
  updateKey,
  fetchedArray,
}) => {
  const [numberOfCourses, setNumberOfCourses] = useState("Back");
  const [searchQuery, setSearchQuery] = useState("");
  const [areCoursesAvailable, setAreCoursesAvailable] = useState(true);

  const allCoursesArray = fetchedArray.courses;
  const cdcsArray = fetchedArray.cdcs;
  const localStorageArray =
    JSON.parse(localStorage.getItem("storedMoreCourses")) || [];
  const deletedCDCs = JSON.parse(localStorage.getItem("deletedCDCs")) || [];
  const moreCoursesArray = allCoursesArray.filter((course) => {
    const isCDCPresent = cdcsArray.some((cdc) => cdc.course_no === course.course_no);
    const isLocalStorageItemPresent = localStorageArray.some(
      (localStorageItem) => localStorageItem.course_no === course.course_no
    );
    const isCDCDeleted = deletedCDCs.includes(course.course_title);
    
    let matchedCDC = null;
    if (isCDCPresent && !isLocalStorageItemPresent) {
      if (isCDCDeleted) {
        matchedCDC = cdcsArray.find((cdc) => cdc.course_title === course.course_title);

      }
      return true; 
    }
  
    return !isCDCPresent && !isLocalStorageItemPresent && (!matchedCDC || course.course_no !== matchedCDC.course_no);
  });
  

  const combinedArray = [...moreCoursesArray, ...cdcsArray.filter(cdc => deletedCDCs.includes(cdc.course_title))];

  

  const filteredCourses = moreCoursesArray.filter(
    (item) =>
      item.course_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const areCoursesAvailable = filteredCourses.length > 0;
    setAreCoursesAvailable(areCoursesAvailable);
  }, [filteredCourses]);

  useEffect(() => {
    const storedMoreCourses =
      JSON.parse(localStorage.getItem("storedMoreCourses")) || [];
    storedMoreCourses.forEach((course) => {
      const targetDiv = document.getElementById(`more-courses-${course.id}`);
      if (targetDiv) {
        targetDiv.classList.add(styles["course-added"]);
      }
    });
  }, []);


  const handleBackButtonClick = () => {
    if (numberOfCourses === "Back") {
      onAddMoreCourseBack();
    } else if (numberOfCourses === "Max Courses") {
      onAddMoreCourseBack();
    } else {
      const courseElements = document.getElementsByClassName(
        styles["all-courses"] + " " + styles["course-added"]
      );
      const selectedCourses = Array.from(courseElements).map((element) => {
        return {
          id: element.id.split("-")[2],
          course_no: element.querySelector("h3").innerText,
          course_title: element.querySelector(`.${styles["amc-course-title"]}`)
            .innerText,
          credits: element.querySelector(`.${styles["amc-credits"]}`).innerText,
        };
      });

      const existingCourses = JSON.parse(
        localStorage.getItem("storedMoreCourses") || "[]"
      );
      const updatedCourses = mergeWithoutDuplicates(
        existingCourses,
        selectedCourses
      );
      localStorage.setItem("storedMoreCourses", JSON.stringify(updatedCourses));

      onAddMoreCourseBack();
      moreCourseAdded();
    }
    updateKey();
  };
  function mergeWithoutDuplicates(arr1, arr2) {
    const merged = [...arr1];
    for (const item of arr2) {
      if (!merged.some((existingItem) => existingItem.id === item.id)) {
        merged.push(item);
      }
    }
    return merged;
  }

  const onCoursesClick = (e) => {
    const courseElements = document.getElementsByClassName(
      styles["all-courses"] + " " + styles["course-added"]
    );
    const addBtn = document.getElementsByClassName(styles["amc-add-btn"])[0];
    if (courseElements.length === 0) {
      setNumberOfCourses("Back");
      addBtn.className = styles["amc-add-btn"];
    } else if (courseElements.length === 1) {
      setNumberOfCourses(`Add ${courseElements.length} Course`);
      addBtn.className = styles["amc-add-btn"] + " " + styles["course-added"];
    } else if (courseElements.length < 6) {
      setNumberOfCourses(`Add ${courseElements.length} Courses`);
      addBtn.className = styles["amc-add-btn"] + " " + styles["course-added"];
    } else {
      setNumberOfCourses(`Max Courses`);
    }
  };

  function getTextAfterKeyword(text) {
    const keyword = "more-courses-";
    const regex = new RegExp(`(?<=${keyword}).*`);
    const result = text.match(regex);
    return result ? result[0] : null;
  }

  const [key , setKey] = useState(0);

  const onCourseChildClick = (e) => {
    setKey((prev)=>prev+1)
    const targetDiv = e.currentTarget.parentElement;

    if (targetDiv.className === styles["all-courses"]) {
      targetDiv.className =
        styles["all-courses"] + " " + styles["course-added"];
    } else if (
      targetDiv.className ===
      styles["all-courses"] + " " + styles["course-added"]
    ) {
      const storedMoreCourses = JSON.parse(
        localStorage.getItem("storedMoreCourses") || "[]"
      );
      const updatedMoreCourses = storedMoreCourses.filter(
        (course) => course.id !== getTextAfterKeyword(targetDiv.id)
      );
      localStorage.setItem(
        "storedMoreCourses",
        JSON.stringify(updatedMoreCourses)
      );
      targetDiv.className = styles["all-courses"];
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27 ) {
        onAddMoreCourseBack();
      }
      if (event.keyCode === 13) {
        handleBackButtonClick();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [numberOfCourses , key]);

  return (
    <div
      className={styles["add-more-courses-container"]}
      onClick={onCourseClickClose3}
    >
      <div className={styles["add-more-courses"]}>
        <div className={styles["amc-searchbox"]}>
          <form action="">
            <button type="submit" className={styles["amc-search-btn"]}>
              <img src={IconSearch} alt="Search" />
            </button>
            <input
              type="text"
              id="coursesSearchInput"
              className={styles["coursesSearchInput"]}
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </form>
        </div>
        <div className={styles["amc-courses-container"]}>
          {areCoursesAvailable ? (
            moreCoursesArray.map((item) => (
              <div
                key={item.course_id}
                className={styles["all-courses"]}
                id={`more-courses-${item.course_title.replace(/ +/g, "")}`}
                onClick={onCoursesClick}
                style={{
                  display: item.course_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.course_title.toLowerCase().includes(searchQuery.toLowerCase()) ? "" : "none"
                }}
              >
                <h3 onClick={onCourseChildClick}>{item.course_no}</h3>
                <p
                  onClick={onCourseChildClick}
                  className={styles["amc-course-title"]}
                >
                  {item.course_title}
                </p>
                <p
                  onClick={onCourseChildClick}
                  className={styles["amc-credits"]}
                >
                  {item.credits} Credits
                </p>
              </div>
            ))
          ) : (
            <div className={styles["no-course-found"]}>
              <img
                src={Oops}
                alt="No Courses"
                className={styles["no-courses-image"]}
              />
              <div className={styles["no-course-text"]}>
                <h2>OOPS!</h2>
                <p>No Course found</p>
              </div>
            </div>
          )}
        </div>

        <div className={styles["amc-add-btn"]} onClick={handleBackButtonClick}>
          {numberOfCourses}
        </div>
      </div>
    </div>
  );
};

export default AddMoreCourse;
