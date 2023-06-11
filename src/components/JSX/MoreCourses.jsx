import React from "react";
import IconBook from "../../assets/IconBook.svg";
import IconBookWhite from "../../assets/IconBookWhite.svg";
import "../CSS/CDCs.css";

const MoreCourses = ({onCourseClick}) => {
  let array = [
    { id: 6, title: "Technical Report Writing" },
    { id: 7, title: "General Physics" },
    { id: 8, title: "General Mathematics" },
  ];

  const courseClickUnique =(id)=>{
    onCourseClick(id);
  };

  return (
    <div className="courses-container">
      {array.map((item) => (
        <div key={item.id} className="course-div" onClick={()=> courseClickUnique(item.title)}>
          <img src={IconBookWhite} alt="book" />
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default MoreCourses;
