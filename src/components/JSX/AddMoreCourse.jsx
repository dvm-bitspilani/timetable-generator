import React , {useState, useEffect} from "react";
import styles from "../CSS/AddMoreCourse.module.css";
import IconSearch from "../../assets/IconSearch.svg";
import Oops from "../../assets/NoCourseError.svg";

const AddMoreCourse = ({onAddMoreCourseBack,moreCourseNotAdded, moreCourseAdded , onCourseClickClose3,updateKey , fetchedArray}) =>{

  const [selectedCourses, setSelectedCourses] = useState([]);
  
  const moreCoursesArray = fetchedArray.courses;

  const [numberOfCourses , setNumberOfCourses] = useState("Back");
  const [searchQuery, setSearchQuery] = useState("");
  const [areCoursesAvailable, setAreCoursesAvailable] = useState(true);

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
    const storedMoreCourses = JSON.parse(localStorage.getItem('storedMoreCourses')) || [];
    storedMoreCourses.forEach(course => {
      const targetDiv = document.getElementById(`more-courses-${course.id}`);
      if (targetDiv) {
        targetDiv.classList.add(styles['course-added']);
      }
    });
  }, []);

// console.log(filteredCourses)


const handleBackButtonClick = () => {
  if (numberOfCourses === "Back") {
    const courseElements = document.getElementsByClassName(styles['all-courses'] + ' ' + styles['course-added']);
    console.log(courseElements)
    const selectedCourses = Array.from(courseElements).map((element) => {
      return {
        id: element.id.split('-')[2],
        course_no: element.querySelector('h3').innerText,
        course_title: element.querySelector(`.${styles['amc-course-title']}`).innerText,
        credits: element.querySelector(`.${styles['amc-credits']}`).innerText
      };
    });

    const existingCourses = JSON.parse(localStorage.getItem("storedMoreCourses") || "[]");
    const updatedCourses = mergeWithoutDuplicates(existingCourses, selectedCourses);
    localStorage.setItem("storedMoreCourses", JSON.stringify(updatedCourses));

    onAddMoreCourseBack();

    if (courseElements.length === 0) {
      moreCourseNotAdded();
    }
  } else if (numberOfCourses === "Max Courses") {
    onAddMoreCourseBack();
  } else {
    const courseElements = document.getElementsByClassName(styles['all-courses'] + ' ' + styles['course-added']);
    const selectedCourses = Array.from(courseElements).map((element) => {
      return {
        id: element.id.split('-')[2],
        course_no: element.querySelector('h3').innerText,
        course_title: element.querySelector(`.${styles['amc-course-title']}`).innerText,
        credits: element.querySelector(`.${styles['amc-credits']}`).innerText
      };
    });

    const existingCourses = JSON.parse(localStorage.getItem("storedMoreCourses") || "[]");
    const updatedCourses = mergeWithoutDuplicates(existingCourses, selectedCourses);
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

  const onCoursesClick = (e) =>{
    const courseElements = document.getElementsByClassName(styles['all-courses'] + ' ' + styles['course-added']);
    const addBtn = document.getElementsByClassName(styles['amc-add-btn'])[0];
    if (courseElements.length === 0) {
      setNumberOfCourses("Back");
      addBtn.className = styles['amc-add-btn'];
    } else if (courseElements.length === 1) {
      setNumberOfCourses(`Add ${courseElements.length} Course`);
      addBtn.className = styles['amc-add-btn'] + ' ' + styles['course-added'];
    } else if (courseElements.length < 6) {
      setNumberOfCourses(`Add ${courseElements.length} Courses`);
      addBtn.className = styles['amc-add-btn'] + ' ' + styles['course-added'];
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

  const onCourseChildClick = (e) => {
    const targetDiv = e.currentTarget.parentElement;
    console.log(targetDiv)
    console.log(getTextAfterKeyword(targetDiv.id));
    if (targetDiv.className === styles["all-courses"]) {
      targetDiv.className = styles["all-courses"] + ' ' + styles["course-added"];
    } else if (targetDiv.className === styles["all-courses"] + ' ' + styles["course-added"]) {
      const existingCourses = JSON.parse(localStorage.getItem("storedMoreCourses") || "[]");
      console.log(existingCourses)
      const storedMoreCourses = JSON.parse(localStorage.getItem("storedMoreCourses") || "[]");
      const updatedMoreCourses = storedMoreCourses.filter((course) => course.id !== getTextAfterKeyword(targetDiv.id));
      localStorage.setItem("storedMoreCourses", JSON.stringify(updatedMoreCourses));
      targetDiv.className = styles["all-courses"];
    }
  };
  

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };


  return (
    <div className={styles["add-more-courses-container"]} onClick={onCourseClickClose3}>
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
            filteredCourses.map((item) => (
              <div
                key={item.course_id}
                className={styles["all-courses"]}
                id={`more-courses-${item.course_title.replace(/ +/g, "")}`}
                onClick={onCoursesClick}
              >
                <h3 onClick={onCourseChildClick} >{item.course_no}</h3>
                <p onClick={onCourseChildClick} className={styles["amc-course-title"]} >{item.course_title}</p>
                <p onClick={onCourseChildClick} className={styles["amc-credits"]}>{item.credits} Credits</p>
              </div>
            ))
          ) : (
            <div className={styles["no-course-found"]}>
              <img src={Oops} alt="No Courses" className={styles["no-courses-image"]} />
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