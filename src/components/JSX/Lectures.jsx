import React, { useEffect, useState } from "react";
import "../CSS/Lectures.css";

const Lectures = ({ courseId }) => {
  const lectureArray = [
    {
      id: 1,
      lecture: "L 1",
      room: 5101,
      faculty: "Prof Shivang Rai",
      hours: "0900Hrs - 0950Hrs",
    },
    {
      id: 2,
      lecture: "L 2",
      room: 5102,
      faculty: "Prof Shivang Rai",
      hours: "0900Hrs - 0950Hrs",
    },
    {
      id: 3,
      lecture: "L 3",
      room: 5103,
      faculty: "Prof Shivang Rai",
      hours: "0900Hrs - 0950Hrs",
    },
    {
      id: 4,
      lecture: "L 4",
      room: 5104,
      faculty: "Prof Shivang Rai",
      hours: "0900Hrs - 0950Hrs",
    },
    // {id:5, lecture: "L 4" , room: 5104 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"},
    // {id:6, lecture: "L 1" , room: 5101 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"},
    // {id:7, lecture: "L 2" , room: 5102 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"},
    // {id:8, lecture: "L 3" , room: 5103 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"},
    // {id:9, lecture: "L 4" , room: 5104 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"},
    // {id:10, lecture: "L 4" , room: 5104 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"}
  ];

  const [want, setWant] = useState(true);

  useEffect(() => {
    const allSections = document.querySelectorAll(".lecture-card");
    allSections.forEach((section) => {
      section.classList.remove("lecture-card-selected");
    });
    if (want == true) {
      const wantedSections =
        JSON.parse(localStorage.getItem("wantedSections")) || [];
      wantedSections.forEach((divId) => {
        const targetDiv = document.getElementById(divId);
        if (targetDiv) {
          targetDiv.classList.add("lecture-card-selected");
        }
      });
    } else {
      const unwantedSections =
        JSON.parse(localStorage.getItem("unwantedSections")) || [];
      unwantedSections.forEach((divId) => {
        const targetDiv = document.getElementById(divId);
        if (targetDiv) {
          targetDiv.classList.add("lecture-card-selected");
        }
      });
    }
  }, [want]);

  const onLectureClick = (e) => {
    const targetDiv = e.currentTarget;
    if (targetDiv.className === "lecture-card") {
      targetDiv.className = "lecture-card lecture-card-selected";

      if (want == true) {
        let wantedSections =
          JSON.parse(localStorage.getItem("wantedSections")) || [];
        wantedSections.push(targetDiv.id);
        localStorage.setItem("wantedSections", JSON.stringify(wantedSections));
      } else {
        let unwantedSections =
          JSON.parse(localStorage.getItem("unwantedSections")) || [];
        unwantedSections.push(targetDiv.id);
        localStorage.setItem(
          "unwantedSections",
          JSON.stringify(unwantedSections)
        );
      }
    } else if (targetDiv.className === "lecture-card lecture-card-selected") {
      targetDiv.className = "lecture-card";

      if (want == true) {
        let wantedSections =
          JSON.parse(localStorage.getItem("wantedSections")) || [];
        const index = wantedSections.indexOf(targetDiv.id);
        if (index > -1) {
          wantedSections.splice(index, 1);
          localStorage.setItem(
            "wantedSections",
            JSON.stringify(wantedSections)
          );
        }
      } else {
        let unwantedSections =
          JSON.parse(localStorage.getItem("unwantedSections")) || [];
        const index = unwantedSections.indexOf(targetDiv.id);
        if (index > -1) {
          unwantedSections.splice(index, 1);
          localStorage.setItem(
            "unwantedSections",
            JSON.stringify(unwantedSections)
          );
        }
      }
    }
  };

  return (
    <div className="lectures" id={courseId}>
      <div className="lectures-container">
        {lectureArray.map((item) => (
          <div
            key={item.id}
            id={`lecture-card${item.id}${courseId.replace(/ +/g, "")}`}
            className="lecture-card"
            onClick={onLectureClick}
          >
            <div className="lecture-room">
              <h3 className="font-weight-600">{item.lecture}</h3>
              <h3 className="font-weight-500">{item.room}</h3>
            </div>
            <h2>{item.faculty}</h2>
            <h2 className="margin-bottom-1rem">{item.hours}</h2>
          </div>
        ))}
      </div>
      <div className="want-or-not-container">
        <input type="checkbox" id="switch" />
        <label
          htmlFor="switch"
          onClick={() => {
            if (want == true) {
              setWant(false);
            } else {
              setWant(true);
            }
          }}
        ></label>
        <p>
          {want ? "I want one out of these only" : "I do not want any of these"}
        </p>
      </div>
    </div>
  );
};

export default Lectures;
