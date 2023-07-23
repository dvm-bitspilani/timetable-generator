import React from "react";
import "../CSS/Error1Component.css";
import cross from "../../../assets/IconCross.svg";

const Error1Component = ({
  closeTimetable,
  img,
  mobileImg,
  title,
  compreCheck,
  clashingCourses,
  handleRetryWithNoCompreClash,
}) => {
  const close = (e) => {
    if (e.target === e.currentTarget) {
      closeTimetable();
    }
  };
  function titleCase(str) {
    let fstr = str.replace(/\s+/g, " ").trim();
    return fstr
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        if (
          word.toLowerCase() === "ii" ||
          word.toLowerCase() === "iii" ||
          word.toLowerCase() === "iv" ||
          word.toLowerCase() === "v"
        ) {
          return word.toUpperCase();
        }
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
    // console.log(str.toLowerCase())
    // return str;
  }


  return (
    <React.Fragment>
      <div className="error1componentcontainer" onClick={close}>
        <div className="error1component">
          <img
            src={cross}
            alt="CLOSE"
            onClick={closeTimetable}
            className="crossicon"
          />
          <div className="laptop-error">
            <img src={img} alt="Error Image" />
          </div>
          <div className="mobile-error">
            <img src={mobileImg} alt="Error Image" />
          </div>
          <p className="error1componentpara">{title}</p>
          {compreCheck ? (
            <div className="compre-clash">
              <div className="clashing-courses">
                <div> There is a Comprehensive Exam Clash in: </div>
                {titleCase(clashingCourses[0].join(", "))}
              </div>
              <p>Would you like to generate timetables regardless?</p>
              <div className="compre-clash-btn">
                <div className="clash-yes-no">
                  <div
                    className="clash-yes"
                    onClick={handleRetryWithNoCompreClash}
                  >
                    Yes
                  </div>
                  <div className="clash-no" onClick={closeTimetable}>
                    No
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Error1Component;
