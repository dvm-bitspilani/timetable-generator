import React from "react";
import IconBookWhite from "../../assets/IconBookWhite.svg";
import "../CSS/CDCs.css";

const CDCs = ({ onCourseClick , array }) => {
  const courseClickUnique =(id)=>{
    onCourseClick(id);
  };

  return (
    <div className="courses-container">
      {array.map((item) => (
        <div key={item.id} className="course-div" onClick={() => courseClickUnique(item.title)}>
          <img src={IconBookWhite} alt="book" />
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default CDCs;
