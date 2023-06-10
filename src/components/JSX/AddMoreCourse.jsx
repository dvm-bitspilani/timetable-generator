import React from "react";
import "../CSS/AddMoreCourse.css";
import IconSearch from "../../assets/IconSearch.svg"

const AddMoreCourse = () =>{
  return(
    <div className="add-more-courses-container">
      <div className="add-more-courses">
        <div className="amc-searchbox"></div>
        <div className="amc-courses-container"></div>
        <div className="amc-add-btn"></div>
      </div>
    </div>
  )
};

export default AddMoreCourse;