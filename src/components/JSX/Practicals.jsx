import React, { useEffect, useState } from "react";
import "../CSS/Lectures.css";

const Practicals = ({ courseId , sectionArray }) => {
  console.log(courseId);
  console.log(sectionArray);
  const [filteredSections, setFilteredSections] = useState(null);
  
  useEffect(() => {
    const filteredData = sectionArray.filter(
      (item) => item.course_title === courseId
    );
    setFilteredSections(filteredData);
  }, [courseId, sectionArray]);
  
  console.log(filteredSections);
  console.log(filteredSections && filteredSections[0].practical);
  





  const [want, setWant] = useState(true);

  useEffect(() => {
    const allSections = document.querySelectorAll(".lecture-card");
    allSections.forEach((section) => {
      section.classList.remove("lecture-card-selected");
    });
    if (want) {
      const wantedSections =
        JSON.parse(localStorage.getItem("wantedSections")) || [];
      setTimeout(() => {
        wantedSections.forEach((divId) => {
          const targetDiv = document.getElementById(divId);
          if (targetDiv) {
            targetDiv.classList.add("lecture-card-selected");
          }
        });
      }, 0);
    } else {
      const unwantedSections =
        JSON.parse(localStorage.getItem("unwantedSections")) || [];
      setTimeout(() => {
        unwantedSections.forEach((divId) => {
          const targetDiv = document.getElementById(divId);
          if (targetDiv) {
            targetDiv.classList.add("lecture-card-selected");
          }
        });
      }, 0);
    }
  }, [want]);

  const onLectureClick = (e) => {
    const targetDiv = e.currentTarget;
    const targetCourse = targetDiv.id.slice(4);
    const courseRegex = new RegExp(`^T.+-${targetCourse}$`);
    let wantedSections =
      JSON.parse(localStorage.getItem("wantedSections")) || [];
    let unwantedSections =
      JSON.parse(localStorage.getItem("unwantedSections")) || [];
    if (targetDiv.className === "lecture-card") {
      targetDiv.className = "lecture-card lecture-card-selected";

      if (want == true) {
        wantedSections.push(targetDiv.id);
        localStorage.setItem("wantedSections", JSON.stringify(wantedSections));
        let updateUnwanted = unwantedSections.filter((element) => {
          if (!courseRegex.test(element)) {
            return element;
          }
        });
        localStorage.setItem(
          "unwantedSections",
          JSON.stringify(updateUnwanted)
        );
      } else {
        unwantedSections.push(targetDiv.id);
        localStorage.setItem(
          "unwantedSections",
          JSON.stringify(unwantedSections)
        );
        let updateWanted = wantedSections.filter((element) => {
          if (!courseRegex.test(element)) {
            return element;
          }
        });
        localStorage.setItem("wantedSections", JSON.stringify(updateWanted));
      }
    } else if (targetDiv.className === "lecture-card lecture-card-selected") {
      targetDiv.className = "lecture-card";

      if (want == true) {
        const index = wantedSections.indexOf(targetDiv.id);
        if (index > -1) {
          wantedSections.splice(index, 1);
          localStorage.setItem(
            "wantedSections",
            JSON.stringify(wantedSections)
          );
        }
      } else {
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

  function getDayAndTime(slotNumber) {
    const slotsPerDay = 10; 
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; 
  
    const dayIndex = Math.floor((slotNumber - 1) / slotsPerDay); 
    const slotIndex = (slotNumber - 1) % slotsPerDay; 
  
    const startTime = 8; 
    const slotDuration = 1; 
  
    const startHour = startTime + slotIndex; 
    const endHour = startHour + slotDuration; 
  
    const day = days[dayIndex];
  
    return {
      day: day,
      startHour: startHour,
      endHour: endHour
    };
  }

  return (
    <div className="lectures" id={courseId}>
      <div className="lectures-container">
        {filteredSections && filteredSections[0].practical.map((item) => {
          const { day, startHour, endHour } = getDayAndTime(item.slots[0]);
          return (
          <div
            key={item.sec_id}
            id={`P${Object.values(item)[0] ? Object.values(item)[0] : ""} -${courseId ? courseId.replace(/ +/g, "") : ""}`}
            className="lecture-card"
            onClick={onLectureClick}
          >
            <div className="lecture-room">
                <h3 className="font-weight-600">P {item.sec}</h3>
               { item.room !== "NA" && <h3 className="font-weight-500">{item.room}</h3>}
              </div>
              <h2>{item.instructors}</h2>
              {item.slots[0] && <h2 className="margin-bottom-1rem">
                {day} {startHour} - {endHour}
              </h2>}
          </div>
        );
        })}
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

export default Practicals;
