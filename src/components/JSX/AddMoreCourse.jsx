import React , {useState, useEffect} from "react";
import styles from "../CSS/AddMoreCourse.module.css";
import IconSearch from "../../assets/IconSearch.svg";
import Oops from "../../assets/NoCourseError.svg";

const AddMoreCourse = ({onAddMoreCourseBack,moreCourseNotAdded, moreCourseAdded , onCourseClickClose3,updateKey , fetchedArray}) =>{

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
        targetDiv.style.display="none";
      }
    });
  }, []);



  const handleBackButtonClick = () => {
    const courseElements = document.getElementsByClassName(styles['all-courses'] + ' ' + styles['course-added']);
    const selectedCourses = Array.from(courseElements).map((element) => {
      return {
        id: element.id.split('-')[2],
        course_no: element.querySelector('h3').innerText,
        course_title: element.querySelector(`.${styles['amc-course-title']}`).innerText,
        credits: element.querySelector(`.${styles['amc-credits']}`).innerText
      };
    });
    localStorage.setItem("storedMoreCourses", JSON.stringify(selectedCourses));
    onAddMoreCourseBack();
    moreCourseAdded(); // Assuming this function shows some kind of success message to the user after adding the courses.
    updateKey();
  };
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
    if (e.target.classList.contains(styles['all-courses'])) {
      e.target.classList.add(styles['course-added']);
    }
    if (e.target.classList.contains(styles['course-added'])) {
      e.target.classList.remove(styles['course-added']);
    }
  };
  const onCourseChildClick = (e) => {
    const targetDiv = e.currentTarget.parentElement;
    if (targetDiv.className === styles["all-courses"]) {
      targetDiv.className = styles["all-courses"] + ' ' + styles["course-added"];
    } else if (targetDiv.className === styles["all-courses"] + ' ' + styles["course-added"]) {
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
                <h3 onClick={onCourseChildClick}>{item.course_no}</h3>
                <p className={styles["amc-course-title"]} onClick={onCourseChildClick}>{item.course_title}</p>
                <p className={styles["amc-credits"]}>{item.credits} Credits</p>
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