import React from "react";
import IconBook from "../../assets/IconBook.svg";
import IconBookWhite from "../../assets/IconBookWhite.svg";
import "../CSS/CDCs.css";

const MoreCourses = () =>{

  let array = [
    { id: 6 , title: "General Chemistry"},
    { id: 7 , title: "General Chemistry"},
    { id: 8 , title: "General Chemistry"}   
  ];

  return (
    <div className="courses-container">
      {array.map(item =>(
        <div key={item.id} className = "course-div">
          <img src = {IconBookWhite} alt="book" />
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  );

};

export default MoreCourses;