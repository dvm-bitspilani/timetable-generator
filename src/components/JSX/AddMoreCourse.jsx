import React , {useState, useEffect} from "react";
import "../CSS/AddMoreCourse.css";
import IconSearch from "../../assets/IconSearch.svg"

const AddMoreCourse = ({onAddMoreCourseBack}) =>{

  let courseArray = [
    {id: 1, title: "PHY F111", Name: "General Chemistry"},
    {id: 2, title: "PHY F112", Name: "General Chemistry"},
    {id: 3, title: "PHY F113", Name: "General Chemistry"},
    {id: 4, title: "PHY F114", Name: "General Chemistry"},
    {id: 5, title: "PHY F115", Name: "General Chemistry"},
    {id: 6, title: "PHY F116", Name: "General Chemistry"},
    {id: 7, title: "PHY F117", Name: "General Chemistry"},
    {id: 8, title: "PHY F118", Name: "General Chemistry"},
    {id: 9, title: "PHY F119", Name: "General Chemistry"},
    {id: 10, title: "PHY F121", Name: "General Chemistry"},
    {id: 11, title: "PHY F131", Name: "General Chemistry"},
    {id: 12, title: "PHY F141", Name: "General Chemistry"}
  ];

  const [numberOfCourses , setNumberOfCourses] = useState("Back");

  useEffect(() => {
    const storedMoreCourses = JSON.parse(localStorage.getItem('storedMoreCourses')) || [];
    storedMoreCourses.forEach(course => {
      const targetDiv = document.getElementById(`more-courses-${course.id}`);
      if (targetDiv) {
        targetDiv.classList.add('course-added');
      }
    });
  }, []);



  const handleBackButtonClick = () => {
    if (numberOfCourses === "Back") {
      const courseElements = document.getElementsByClassName("all-courses course-added");
      const selectedCourses = Array.from(courseElements).map((element) => {
        return {
          id: element.id.split('-')[2],
          title: element.querySelector('h3').innerText,
          name: element.querySelector('p').innerText,
        };
      });
      localStorage.setItem("storedMoreCourses", JSON.stringify(selectedCourses));
      onAddMoreCourseBack();
    } else {
      const courseElements = document.getElementsByClassName("all-courses course-added");
      const selectedCourses = Array.from(courseElements).map((element) => {
        return {
          id: element.id.split('-')[2],
          title: element.querySelector('h3').innerText,
          name: element.querySelector('p').innerText,
        };
      });
      localStorage.setItem("storedMoreCourses", JSON.stringify(selectedCourses));
      onAddMoreCourseBack();
    }
  };
  const onCoursesClick = (e) =>{
    const courseElements = document.getElementsByClassName("all-courses course-added");
    if (courseElements.length === 0) {
      setNumberOfCourses("Back");
      document.getElementsByClassName("amc-add-btn")[0].className = "amc-add-btn"
    } else if(courseElements.length === 1){
      setNumberOfCourses(`Add ${courseElements.length} Course`);
      document.getElementsByClassName("amc-add-btn")[0].className = "amc-add-btn course-added"
    } else {
      setNumberOfCourses(`Add ${courseElements.length} Courses`);
      document.getElementsByClassName("amc-add-btn")[0].className = "amc-add-btn course-added"
    }
    if(e.target.className === "all-courses"){
      e.target.className = "all-courses course-added"
    }
    if(e.target.className === "all-courses course-added"){
      e.target.className = "all-courses"
    }
  };
  const onCourseChildClick = (e) => {
    const targetDiv = e.currentTarget.parentElement;
    if (targetDiv.className === "all-courses") {
      targetDiv.className = "all-courses course-added";
    } else if (targetDiv.className === "all-courses course-added") {
      targetDiv.className = "all-courses";
    }
  };

  return(
    <div className="add-more-courses-container">
      <div className="add-more-courses">
        <div className="amc-searchbox">
          <form action="">
            <button type="submit" className="amc-search-btn">
              <img src={IconSearch} alt="Search" />
            </button>
            <input type="text" id="coursesSearchInput" placeholder="Search"/>
          </form>
        </div>
        <div className="amc-courses-container">
          {courseArray.map(item => (
            <div key={item.id} className="all-courses" id={`more-courses-${item.title.replace(/ +/g, "")}`} onClick={onCoursesClick}>
              <h3 onClick={onCourseChildClick}>{item.title}</h3>
              <p onClick={onCourseChildClick}>{item.Name}</p>
            </div>
          ))}
        </div>
        <div className="amc-add-btn" onClick={handleBackButtonClick} >{numberOfCourses}</div>
      </div>
    </div>
  )
};

export default AddMoreCourse;