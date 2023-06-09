import React from "react";
import IconBook from "../../assets/IconBook.svg";
import IconBookWhite from "../../assets/IconBookWhite.svg";
import "../CSS/CDCs.css";

const CDCs = () => {
  let array = [
    { id: 1, title: "General Chemistry" },
    { id: 2, title: "General Chemistry" },
    { id: 3, title: "General Chemistry" },
    { id: 4, title: "General Chemistry" },
    { id: 5, title: "General Chemistry" },
  ];

  return (
    <div className="courses-container">
      {array.map((item) => (
        <div key={item.id} className="course-div">
          <img src={IconBookWhite} alt="book" />
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default CDCs;