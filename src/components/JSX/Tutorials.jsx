import React, { useEffect, useState } from "react";
import styles from "../CSS/Lectures.module.css";
import "../CSS/CourseIsSelected.css";

const Tutorials = ({ courseId, sectionArray, want , setWant }) => {
  const [filteredSections, setFilteredSections] = useState(null);

  useEffect(() => {
    const filteredData = sectionArray.filter(
      (item) => item.course_title === courseId
    );
    setFilteredSections(filteredData);
  }, [courseId, sectionArray]);


  const [allUnwanted , setAllUnwanted] = useState(false);

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
  }, [want]);

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

    if (want === false && allUnwantedSections.length === (allSections.length - 1) && !targetDiv.classList.contains(styles["lecture-card-selected"])) {
      console.log("Error: You cannot mark all lectures as 'do not want'.");
      setAllUnwanted(true);
      return;
    } else {
      setAllUnwanted(false);
    }
    const courseRegex = new RegExp(`^T.+-${targetCourse}(-\\d+)?$`);
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

  function getDayAndTime(slot) {
    const dayStart = 8;
    const slotDuration = 1;

    let day, startHour, endHour;

    if (slot < 12) {
      // Monday
      day = "Monday";
      startHour = dayStart + slot;
    } else if (slot < 32) {
      // Tuesday
      day = "Tuesday";
      startHour = dayStart + (slot - 20);
    } else if (slot < 52) {
      // Wednesday
      day = "Wednesday";
      startHour = dayStart + (slot - 40);
    } else if (slot < 72) {
      // Thursday
      day = "Thursday";
      startHour = dayStart + (slot - 60);
    } else if (slot < 92) {
      // Friday
      day = "Friday";
      startHour = dayStart + (slot - 80);
    } else if (slot < 112) {
      // Saturday
      day = "Saturday";
      startHour = dayStart + (slot - 100);
    } else {
      return "Invalid slot number";
    }

    endHour = startHour + slotDuration;
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
          filteredSections[0].tutorial.map((item) => {
            const { day, startHour, endHour } = getDayAndTime(item.slots[0]);
            return (
              <div
                key={item.sec_id}
                id={`T${
                  Object.values(item)[0] ? Object.values(item)[0] : ""
                } -${courseId ? courseId.replace(/ +/g, "") : ""}-${
                  Object.values(item)[1] ? Object.values(item)[1] : ""
                }`}
                className={styles["lecture-card"]}
                onClick={onLectureClick}
              >
                <div className={styles["lecture-room"]}>
                  <h3 className={styles["font-weight-600"]}>
                    T {item.sec}
                  </h3>
                  {item.room !== "NA" && (
                    <h3 className={styles["font-weight-500"]}>
                      {item.room}
                    </h3>
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
      <div className={styles["want-or-not-container"]}>
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
      {allUnwanted && <p className={styles["errormessage"]}>You need to keep atleast one option available for each course!</p>}
    </div>
  );
};

export default Tutorials;
