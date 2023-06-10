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
            <div key={item.id} className="all-courses" >
              <h3>{item.title}</h3>
              <p>{item.Name}</p>
            </div>
          ))}
        </div>
        <div className="amc-add-btn" onClick={handleBackButtonClick} >{numberOfCourses}</div>
      </div>
    </div>
  )
};

export default AddMoreCourse;