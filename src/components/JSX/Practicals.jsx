import React, { useEffect, useState } from "react";
import styles from "../CSS/Lectures.module.css";
import "../CSS/CourseIsSelected.css";

const Practicals = ({ courseId, sectionArray, want , setWant }) => {

  const [filteredSections, setFilteredSections] = useState(null);
  const [allUnwanted , setAllUnwanted] = useState(false);
  const [oneSection , setOneSection] = useState(false);

  useEffect(() => {
    const filteredData = sectionArray.filter(
      (item) => item.course_title.replace(/\s+/g, ' ').trim() === courseId
    );
    setFilteredSections(filteredData);
  }, [courseId, sectionArray]);

  useEffect(() => {
    if (filteredSections && filteredSections[0]["practical"].length === 1) {
      setOneSection(true);
    } else {
      setOneSection(false);
    }
  }, [filteredSections , courseId]);

  useEffect(() => {
    const allSections = document.querySelectorAll(`.${styles["lecture-card"]}`);
    allSections.forEach((section) => {
      section.classList.remove(styles["lecture-card-selected"]);
    });
    if (want) {
      const wantedSections =
        JSON.parse(localStorage.getItem("wantedSections")) || [];
      setTimeout(() => {
        wantedSections.forEach((divId) => {
          const targetDiv = document.getElementById(divId);
          if (targetDiv) {
            targetDiv.classList.add(styles["lecture-card-selected"]);
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
            targetDiv.classList.add(styles["lecture-card-selected"]);
          }
        });
      }, 0);
    }
  }, [want.courseId]);

  useEffect(() => {
    if (filteredSections && filteredSections[0]["practical"].length === 1) {
      setWant(true);
      const defaultSelectedLectureId = `P${filteredSections[0]["practical"][0].sec} -${filteredSections[0]["course_title"].replace(/ +/g, "")}-${filteredSections[0]["practical"][0].sec_id}`;

      let wantedSections = JSON.parse(localStorage.getItem("wantedSections")) || [];

      const isAlreadySelected = wantedSections.some((sectionId) => sectionId === defaultSelectedLectureId);

      if (!isAlreadySelected) {
        wantedSections.push(defaultSelectedLectureId);
        localStorage.setItem("wantedSections", JSON.stringify(wantedSections));
        document.getElementById(defaultSelectedLectureId).classList.add(styles["lecture-card-selected"]);
      }
    }
  }, [want, courseId, filteredSections]);

  const onLectureClick = (e) => {
    function getTextBetweenHyphens(str) {
      const regex = /-(.*?)-/;
      const match = regex.exec(str);
      if (match && match.length >= 2) {
        return match[1].trim();
      }
      return "";
    }
    const targetDiv = e.currentTarget;
    const targetCourse = getTextBetweenHyphens(targetDiv.id);
    const allSections = document.querySelectorAll(`.${styles["lecture-card"]}`);
    const allUnwantedSections = document.querySelectorAll(`.${styles["lecture-card-selected"]}`);

    if (want === false &&!oneSection&&  allUnwantedSections.length === (allSections.length - 1) && !targetDiv.classList.contains(styles["lecture-card-selected"])) {
      console.log("Error: You cannot mark all lectures as 'do not want'.");
      setAllUnwanted(true);
      return;
    } else {
      setAllUnwanted(false);
    }

    const courseRegex = new RegExp(`^P.+-${targetCourse}(-\\d+)?$`);
    let wantedSections =
      JSON.parse(localStorage.getItem("wantedSections")) || [];
    let unwantedSections =
      JSON.parse(localStorage.getItem("unwantedSections")) || [];
    if (targetDiv.className === styles["lecture-card"]) {
      targetDiv.classList.add(styles["lecture-card-selected"]);

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
    } else if (
      targetDiv.className ===
      `${styles["lecture-card"]} ${styles["lecture-card-selected"]}`
    ) {
      targetDiv.classList.remove(styles["lecture-card-selected"]);

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

  function getDayAndTime(slots) {
    const dayStart = 8;
    const slotDuration = 1;
  
    if (!Array.isArray(slots) || slots.length === 0) {
      return "Invalid slots";
    }
  
    let day, startHour, endHour;
  
    const firstSlot = slots[0];
    const lastSlot = slots[slots.length - 1];
  
    if (firstSlot < 12) {
      // Monday
      day = "Monday";
      startHour = dayStart + firstSlot;
    } else if (firstSlot < 32) {
      // Tuesday
      day = "Tuesday";
      startHour = dayStart + (firstSlot - 20);
    } else if (firstSlot < 52) {
      // Wednesday
      day = "Wednesday";
      startHour = dayStart + (firstSlot - 40);
    } else if (firstSlot < 72) {
      // Thursday
      day = "Thursday";
      startHour = dayStart + (firstSlot - 60);
    } else if (firstSlot < 92) {
      // Friday
      day = "Friday";
      startHour = dayStart + (firstSlot - 80);
    } else if (firstSlot < 112) {
      // Saturday
      day = "Saturday";
      startHour = dayStart + (firstSlot - 100);
    } else {
      return "Invalid slot number";
    }
  
    if (lastSlot < 12) {
      // Monday
      endHour = dayStart + lastSlot + slotDuration;
    } else if (lastSlot < 32) {
      // Tuesday
      endHour = dayStart + (lastSlot - 20) + slotDuration;
    } else if (lastSlot < 52) {
      // Wednesday
      endHour = dayStart + (lastSlot - 40) + slotDuration;
    } else if (lastSlot < 72) {
      // Thursday
      endHour = dayStart + (lastSlot - 60) + slotDuration;
    } else if (lastSlot < 92) {
      // Friday
      endHour = dayStart + (lastSlot - 80) + slotDuration;
    } else if (lastSlot < 112) {
      // Saturday
      endHour = dayStart + (lastSlot - 100) + slotDuration;
    } else {
      return "Invalid slot number";
    }
  
    return {
      day: day,
      startHour: startHour,
      endHour: endHour,
    };
  }

  return (
    <div className={styles["lectures"]} id={courseId}>
      <div className={styles["lectures-container"]}>
        {filteredSections &&
          filteredSections[0].practical.map((item) => {
            const { day, startHour, endHour } = getDayAndTime(item.slots);
            return (
              <div
                key={item.sec_id}
                id={`P${
                  Object.values(item)[0] ? Object.values(item)[0] : ""
                } -${courseId ? courseId.replace(/ +/g, "") : ""}-${
                  Object.values(item)[1] ? Object.values(item)[1] : ""
                }`}
                className={styles["lecture-card"]}
                onClick={onLectureClick}
              >
                <div className={styles["lecture-room"]}>
                  <h3 className={styles["font-weight-600"]}>P {item.sec}</h3>
                  {item.room !== "NA" && (
                    <h3 className={styles["font-weight-500"]}>{item.room}</h3>
                  )}
                </div>
                <h2>{item.instructors.join(", ")}</h2>
                {item.slots[0] !== undefined && (
                  <h2 className={styles["margin-bottom-1rem"]}>
                    {day} {startHour} - {endHour}
                  </h2>
                )}
              </div>
            );
          })}
      </div>
      {oneSection && <p className={styles["instructionmsg"]}>You can not deselect the only option available!</p>}
      {!oneSection && <div className={styles["want-or-not-container"]}>
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
      </div>}
      {allUnwanted && <p className={styles["errormessage"]}>You need to keep atleast one option available for each course!</p>}
    </div>
  );
};

export default Practicals;
