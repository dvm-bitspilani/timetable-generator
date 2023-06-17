import React from "react";
import IconBookWhite from "../../assets/IconBookWhite.svg";
import "../CSS/CDCs.css";

const CDCs = ({ onCourseClick , fetchedArray , courseIsSelectedGreen}) => {
  const courseClickUnique =(id)=>{
    onCourseClick(id);
  };

  return (
    <div className="courses-container">
      {fetchedArray?.cdcs?.map((item) => (
        <div key={item.course_id} className={`course-div ${courseIsSelectedGreen(item.course_title) ? "courseIsSelectedGreen" : ""}`} onClick={() => courseClickUnique(item.course_title)}>
          <img src={IconBookWhite} alt="book" />
          <h3>{item.course_title}</h3>
        </div>
      ))}
    </div>
  );
};

export default CDCs;
