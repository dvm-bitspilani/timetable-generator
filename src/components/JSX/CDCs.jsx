import React from "react";
import IconBookWhite from "../../assets/IconBookWhite.svg";
import "../CSS/CDCs.css";

const CDCs = ({ onCourseClick }) => {
  let array = [
    { id: 1, title: "General Chemistry" },
    { id: 2, title: "General Biology" },
    { id: 3, title: "Mathematics 2" },
    { id: 4, title: "Workshop Practice" },
    { id: 5, title: "Mathematics 1" },
  ];

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
