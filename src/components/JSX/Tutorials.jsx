import React from "react";
import "../CSS/Lectures.css";

const Tutorials = () =>{

  const lectureArray = [
    {id:1, lecture: "L 2" , room: 6101 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"},
    {id:2, lecture: "L 2" , room: 6101 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"},
    {id:3, lecture: "L 2" , room: 6101 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"},
    {id:4, lecture: "L 2" , room: 6101 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"}
  ];

  const onLectureClick = (e) =>{
    const targetDiv = e.currentTarget.parentElement;
    if (targetDiv.className === "lecture-card") {
      targetDiv.className = "lecture-card lecture-card-selected";
    } else if (targetDiv.className === "lecture-card lecture-card-selected") {
      targetDiv.className = "lecture-card";
    }
  };
  const onLectureClick2 = (e) =>{
    const targetDiv = e.currentTarget.parentElement.parentElement;
    if (targetDiv.className === "lecture-card") {
      targetDiv.className = "lecture-card lecture-card-selected";
    } else if (targetDiv.className === "lecture-card lecture-card-selected") {
      targetDiv.className = "lecture-card";
    }
  };



  return(
    <div className="lectures">
      <div className="lectures-container">
        {lectureArray.map(item=>(
          <div key={item.id} className="lecture-card">
            <div className="lecture-room">
              <h3 className="font-weight-600" onClick={onLectureClick2}>{item.lecture}</h3>
              <h3 className="font-weight-500" onClick={onLectureClick2}>{item.room}</h3>
            </div>
            <h2 onClick={onLectureClick}>{item.faculty}</h2>
            <h2 className="margin-bottom-1rem" onClick={onLectureClick}>{item.hours}</h2>
          </div>
        ))}
      </div>
      <div className="want-or-not-container">

      </div>
    </div>
  )
};

export default Tutorials;