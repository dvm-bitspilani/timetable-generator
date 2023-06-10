import React , {useState} from "react";
import "../CSS/AddMoreCourse.css";
import IconSearch from "../../assets/IconSearch.svg"

const AddMoreCourse = ({onAddMoreCourseBack}) =>{

  let courseArray = [
    {id: 1, title: "PHY F111", Name: "Mechanic Oscillations & Waves"},
    {id: 2, title: "PHY F111", Name: "Mechanic Oscillations & Waves"},
    {id: 3, title: "PHY F111", Name: "Mechanic Oscillations & Waves"},
    {id: 4, title: "PHY F111", Name: "Mechanic Oscillations & Waves"},
    {id: 5, title: "PHY F111", Name: "Mechanic Oscillations & Waves"},
    {id: 6, title: "PHY F111", Name: "Mechanic Oscillations & Waves"},
    {id: 7, title: "PHY F111", Name: "Mechanic Oscillations & Waves"},
    {id: 8, title: "PHY F111", Name: "Mechanic Oscillations & Waves"},
    {id: 9, title: "PHY F111", Name: "Mechanic Oscillations & Waves"},
    {id: 10, title: "PHY F111", Name: "Mechanic Oscillations & Waves"},
    {id: 11, title: "PHY F111", Name: "Mechanic Oscillations & Waves"},
    {id: 12, title: "PHY F111", Name: "Mechanic Oscillations & Waves"}
  ];

  const [numberOfCourses , setNumberOfCourses] = useState("Back");

  const handleBackButtonClick = () => {
    if (numberOfCourses === "Back") {
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
            <div key={item.id} className="all-courses" onClick={onCoursesClick}>
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