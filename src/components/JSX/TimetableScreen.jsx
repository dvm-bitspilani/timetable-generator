import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import "../CSS/TimetableScreen.css";
import Timetable from "./Timetable";
import Error1Component from "../ErrorComponents/JSX/Error1Component";
import LoaderIcon from "./LoaderIcon";
import DownloadIcon from "../../assets/IconDownload.svg";
import freeDayErrorImg from "../../assets/freeDayError.png";
import FreeDayErrorMobile from "../../assets/FreeDayErrorMobile.png";
import compreError from "../../assets/compreError.png";
import CompreErrorMobile from "../../assets/CompreErrorMobile.png";
import noTTError from "../../assets/noTTError.png";
import NoTTErrorMobile from "../../assets/NoTTErrorMobile.png";
import backButton from "../../assets/IconBack.png";
import {
  useGoogleLogin,
  GoogleOAuthProvider,
  GoogleLogin,
} from "@react-oauth/google";

const TimetableScreen = ({
  sectionArray,
  courseUnits,
  freeDay,
  closeTimetable,
}) => {
  const [fetchedTable, setFetchedTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tableDataSent, setTableDataSent] = useState(null);
  const [currentTimetableIndex, setCurrentTimetableIndex] = useState(0);
  const [compreClash, setCompreClash] = useState(false);
  const [key, setKey] = useState(0);

  function shiftToNextTimetable() {
    if (tableDataSent === 1) {
      setKey((prev) => prev + 1);
      return;
    } else if (currentTimetableIndex === tableDataSent - 1) {
      setCurrentTimetableIndex(0);
    } else {
      setCurrentTimetableIndex((prevIndex) => prevIndex + 1);
    }
  }
  function shiftToPrevTimetable() {
    if (tableDataSent === 1) {
      setKey((prev) => prev + 1);
      return;
    } else if (currentTimetableIndex === 0) {
      setCurrentTimetableIndex(tableDataSent - 1);
    } else {
      setCurrentTimetableIndex((prevIndex) => prevIndex - 1);
    }
  }

  const handleTableDataSent = (dataSent) => {
    setTableDataSent(dataSent);
  };

  useEffect(() => {
    const fetchData = async () => {
      const coursesWithDuplicates = sectionArray.map((item) => {
        const item_title = item["course_title"].replace(/\s/g, "");

        const wantedSections = JSON.parse(
          localStorage.getItem("wantedSections")
        );
        const unWantedSections = JSON.parse(
          localStorage.getItem("unwantedSections")
        );

        let lecDesired = 0;
        const lecSec = [];
        let tutDesired = 0;
        const tutSec = [];
        let pracDesired = 0;
        const pracSec = [];

        if (
          wantedSections &&
          wantedSections.some(
            (section) =>
              section.startsWith("L") && section.split("-")[1] === item_title
          )
        ) {
          lecDesired = 1;
          wantedSections
            .filter(
              (section) =>
                section.startsWith("L") && section.split("-")[1] === item_title
            )
            .forEach((section) => {
              lecSec.push(parseInt(section.split("-").pop()));
            });
        } else if (
          unWantedSections &&
          unWantedSections.some(
            (section) =>
              section.startsWith("L") && section.split("-")[1] === item_title
          )
        ) {
          lecDesired = 0;
          unWantedSections
            .filter(
              (section) =>
                section.startsWith("L") && section.split("-")[1] === item_title
            )
            .forEach((section) => {
              lecSec.push(parseInt(section.split("-").pop()));
            });
        }
        if (
          wantedSections &&
          wantedSections.some(
            (section) =>
              section.startsWith("T") && section.split("-")[1] === item_title
          )
        ) {
          tutDesired = 1;
          wantedSections
            .filter(
              (section) =>
                section.startsWith("T") && section.split("-")[1] === item_title
            )
            .forEach((section) => {
              tutSec.push(parseInt(section.split("-").pop()));
            });
        } else if (
          unWantedSections &&
          unWantedSections.some(
            (section) =>
              section.startsWith("T") && section.split("-")[1] === item_title
          )
        ) {
          tutDesired = 0;
          unWantedSections
            .filter(
              (section) =>
                section.startsWith("T") && section.split("-")[1] === item_title
            )
            .forEach((section) => {
              tutSec.push(parseInt(section.split("-").pop()));
            });
        }
        if (
          wantedSections &&
          wantedSections.some(
            (section) =>
              section.startsWith("P") && section.split("-")[1] === item_title
          )
        ) {
          pracDesired = 1;
          wantedSections
            .filter(
              (section) =>
                section.startsWith("P") && section.split("-")[1] === item_title
            )
            .forEach((section) => {
              pracSec.push(parseInt(section.split("-").pop()));
            });
        } else if (
          unWantedSections &&
          unWantedSections.some(
            (section) =>
              section.startsWith("P") && section.split("-")[1] === item_title
          )
        ) {
          pracDesired = 0;
          unWantedSections
            .filter(
              (section) =>
                section.startsWith("P") && section.split("-")[1] === item_title
            )
            .forEach((section) => {
              pracSec.push(parseInt(section.split("-").pop()));
            });
        }

        return {
          course_id: item["course_id"],
          lecture: {
            desired: lecDesired,
            sec: lecSec,
          },
          tutorial: {
            desired: tutDesired,
            sec: tutSec,
          },
          practical: {
            desired: pracDesired,
            sec: pracSec,
          },
          misc: {
            desired: 0,
            sec: [],
          },
        };
      });

      const courses = coursesWithDuplicates.reduce((acc, course) => {
        const existingCourse = acc.find(
          (c) => c.course_id === course.course_id
        );

        if (!existingCourse) {
          acc.push(course);
        } else {
          if (course.lecture.desired && !existingCourse.lecture.desired) {
            existingCourse.lecture.desired = course.lecture.desired;
            existingCourse.lecture.sec = course.lecture.sec;
          }
          if (course.tutorial.desired && !existingCourse.tutorial.desired) {
            existingCourse.tutorial.desired = course.tutorial.desired;
            existingCourse.tutorial.sec = course.tutorial.sec;
          }
          if (course.practical.desired && !existingCourse.practical.desired) {
            existingCourse.practical.desired = course.practical.desired;
            existingCourse.practical.sec = course.practical.sec;
          }
          if (course.misc.desired && !existingCourse.misc.desired) {
            existingCourse.misc.desired = course.misc.desired;
            existingCourse.misc.sec = course.misc.sec;
          }
        }

        return acc;
      }, []);

      // if (!compreClash) {
      //   var requestOption = {
      //     "number": 50,
      //     "free_day": `${freeDay}`,
      //     "courses": courses,
      //     "compre_check": true
      //   }
      //   return requestOption;
      // }
      // if (compreClash) {
      //   var requestOption = {
      //     "number": 50,
      //     "free_day": `${freeDay}`,
      //     "courses": courses,
      //     "compre_check": 0
      //   }
      //   return requestOption;
      // }
      const requestOption = {
        number: 50,
        free_day: `${freeDay}`,
        courses: courses,
        compre_check: true,
      };
      const requestOptionsFinal = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestOption),
      };

      const response = await fetch(
        "https://timetable.bits-dvm.org/timetable/timetables/",
        requestOptionsFinal
      );
      const data = await response.json();
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      setFetchedTable(data);
    };
    setTimeout(() => {
      fetchData();
    }, 0);
  }, []);

  const handleRetryWithNoCompreClash = async () => {
    setIsLoading(true);
    const courses = sectionArray.map((item) => {
      const item_title = item["course_title"].replace(/\s/g, "");

      const wantedSections = JSON.parse(localStorage.getItem("wantedSections"));
      const unWantedSections = JSON.parse(
        localStorage.getItem("unwantedSections")
      );

      let lecDesired = 0;
      const lecSec = [];
      let tutDesired = 0;
      const tutSec = [];
      let pracDesired = 0;
      const pracSec = [];

      if (
        wantedSections &&
        wantedSections.some(
          (section) =>
            section.startsWith("L") && section.split("-")[1] === item_title
        )
      ) {
        lecDesired = 1;
        wantedSections
          .filter(
            (section) =>
              section.startsWith("L") && section.split("-")[1] === item_title
          )
          .forEach((section) => {
            lecSec.push(parseInt(section.split("-").pop()));
          });
      } else if (
        unWantedSections &&
        unWantedSections.some(
          (section) =>
            section.startsWith("L") && section.split("-")[1] === item_title
        )
      ) {
        lecDesired = 0;
        unWantedSections
          .filter(
            (section) =>
              section.startsWith("L") && section.split("-")[1] === item_title
          )
          .forEach((section) => {
            lecSec.push(parseInt(section.split("-").pop()));
          });
      }
      if (
        wantedSections &&
        wantedSections.some(
          (section) =>
            section.startsWith("T") && section.split("-")[1] === item_title
        )
      ) {
        tutDesired = 1;
        wantedSections
          .filter(
            (section) =>
              section.startsWith("T") && section.split("-")[1] === item_title
          )
          .forEach((section) => {
            tutSec.push(parseInt(section.split("-").pop()));
          });
      } else if (
        unWantedSections &&
        unWantedSections.some(
          (section) =>
            section.startsWith("T") && section.split("-")[1] === item_title
        )
      ) {
        tutDesired = 0;
        unWantedSections
          .filter(
            (section) =>
              section.startsWith("T") && section.split("-")[1] === item_title
          )
          .forEach((section) => {
            tutSec.push(parseInt(section.split("-").pop()));
          });
      }
      if (
        wantedSections &&
        wantedSections.some(
          (section) =>
            section.startsWith("P") && section.split("-")[1] === item_title
        )
      ) {
        pracDesired = 1;
        wantedSections
          .filter(
            (section) =>
              section.startsWith("P") && section.split("-")[1] === item_title
          )
          .forEach((section) => {
            pracSec.push(parseInt(section.split("-").pop()));
          });
      } else if (
        unWantedSections &&
        unWantedSections.some(
          (section) =>
            section.startsWith("P") && section.split("-")[1] === item_title
        )
      ) {
        pracDesired = 0;
        unWantedSections
          .filter(
            (section) =>
              section.startsWith("P") && section.split("-")[1] === item_title
          )
          .forEach((section) => {
            pracSec.push(parseInt(section.split("-").pop()));
          });
      }

      return {
        course_id: item["course_id"],
        lecture: {
          desired: lecDesired,
          sec: lecSec,
        },
        tutorial: {
          desired: tutDesired,
          sec: tutSec,
        },
        practical: {
          desired: pracDesired,
          sec: pracSec,
        },
        misc: {
          desired: 0,
          sec: [],
        },
      };
    });

    const requestOption = {
      number: 50,
      free_day: `${freeDay}`,
      courses: courses,
      compre_check: 0,
    };

    const requestOptionsFinal = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestOption),
    };

    const response = await fetch(
      "https://timetable.bits-dvm.org/timetable/timetables/",
      requestOptionsFinal
    );
    const data = await response.json();
    setIsLoading(false);
    setFetchedTable(data);
    setCompreClash(false);
  };
  const [downloadableTimetableData, setDownloadableTimetableData] =
    useState(false);
  const handleDownloadScreenshot = () => {
    const timetableContainer = document.querySelector(".hidden-table");

    html2canvas(timetableContainer).then((canvas) => {
      const dataURL = canvas.toDataURL();
      const downloadLink = document.createElement("a");
      downloadLink.href = dataURL;
      downloadLink.download = "timetable_screenshot.png";

      downloadLink.click();
      setDownloadableTimetableData(false);
    });
  };
  const handleDownloadScreenshot2 = () => {
    const timetableContainer = document.querySelector(".table");

    html2canvas(timetableContainer).then((canvas) => {
      const dataURL = canvas.toDataURL();
      const downloadLink = document.createElement("a");
      downloadLink.href = dataURL;
      downloadLink.download = "timetable_screenshot.png";

      downloadLink.click();
      setDownloadableTimetableData(false);
    });
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 37) {
        shiftToPrevTimetable();
      } else if (event.keyCode === 39) {
        shiftToNextTimetable();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentTimetableIndex, key]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        closeTimetable();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const deviceWidth = window.innerWidth;

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });

  return (
    <React.Fragment>
      {isLoading ? (
        <LoaderIcon title="Generating Timetables" />
      ) : (
        !fetchedTable["error"] && (
          <React.Fragment>
            <img
              src={backButton}
              className="backButton"
              onClick={closeTimetable}
              alt=""
            />
            <h1 className="units-heading">
              Units Taken: <span>{courseUnits}</span>
            </h1>
            <p className="units-paragraph">
              If you don’t see a section here, it must be because the hours and
              days are empty in the original TT provided by AUGSD
            </p>

            <div className="table-container">
              <div className="table-area">
                <Timetable
                  timetableData={fetchedTable}
                  tableDataSent={tableDataSent}
                  downloadableTimetableData={downloadableTimetableData}
                  setDownloadableTimetableData={setDownloadableTimetableData}
                  onTableDataSent={handleTableDataSent}
                  currentTimetableIndex={currentTimetableIndex}
                />
              </div>
              <div className="timetableButtons">
                <div className="timetableNumber">
                  <span
                    className="nextprevarrow"
                    style={{ marginLeft: "0.75rem" }}
                    onClick={shiftToPrevTimetable}
                  >
                    {"<"}
                  </span>
                  <span className="timetableNumberData">{`${
                    currentTimetableIndex + 1
                  }/${tableDataSent}`}</span>
                  <span
                    className="nextprevarrow"
                    style={{ marginRight: "0.75rem" }}
                    onClick={shiftToNextTimetable}
                  >
                    {">"}
                  </span>
                </div>
                {deviceWidth >= 1000 && (
                  <div
                    className="downloadButton"
                    onClick={handleDownloadScreenshot}
                  >
                    <img src={DownloadIcon} alt="" />
                  </div>
                )}
                {deviceWidth < 1000 && (
                  <div
                    className="downloadButton"
                    onClick={handleDownloadScreenshot2}
                  >
                    <img src={DownloadIcon} alt="" />
                  </div>
                )}
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />

                {/* <div className="downloadButton" onClick={login()}>
                  <img src={DownloadIcon} alt="" />
                </div> */}
              </div>
              <p className="units-paragraph">
                50 is the max number of timetables shown here
              </p>
              <p className="units-paragraph">
                <a
                  href="https://forms.gle/5kMXBA6ncKSuYkbB6"
                  target="_blank"
                  className="units-paragraph margin-bottom-05"
                >
                  Please share your feedback with us
                </a>
              </p>
            </div>
          </React.Fragment>
        )
      )}
      {!isLoading && fetchedTable["error"] && (
        <React.Fragment>
          {fetchedTable["error_code"] === 32 && (
            <Error1Component
              closeTimetable={closeTimetable}
              img={freeDayErrorImg}
              mobileImg={FreeDayErrorMobile}
              title="Free day not possible"
              compreCheck={false}
              handleRetryWithNoCompreClash={handleRetryWithNoCompreClash}
            />
            // free day error
          )}
          {fetchedTable["error_code"] === 128 && (
            <Error1Component
              closeTimetable={closeTimetable}
              img={noTTError}
              mobileImg={NoTTErrorMobile}
              title="No timetable possible because of lecture
          and tutorial section selected"
              compreCheck={false}
              handleRetryWithNoCompreClash={handleRetryWithNoCompreClash}
            />
            // progress bar not sufficiently completed error
          )}
          {fetchedTable["error_code"] === 64 && (
            <Error1Component
              closeTimetable={closeTimetable}
              img={noTTError}
              mobileImg={NoTTErrorMobile}
              title="Clash Free Time Table is not possible with these cases"
              compreCheck={false}
              handleRetryWithNoCompreClash={handleRetryWithNoCompreClash}
            />
            // progress bar not sufficiently completed error
          )}
          {fetchedTable["error_code"] === 8 && (
            <Error1Component
              closeTimetable={closeTimetable}
              img={compreError}
              mobileImg={CompreErrorMobile}
              title="Comprehensive exams are clashing"
              compreCheck={true}
              clashingCourses={fetchedTable["clashes"]}
              handleRetryWithNoCompreClash={handleRetryWithNoCompreClash}
            />
            //compre clash
          )}
          {fetchedTable["error_code"] === 2 && (
            <Error1Component
              closeTimetable={closeTimetable}
              img={compreError}
              mobileImg={CompreErrorMobile}
              title="Duplicate Courses Given"
              compreCheck={false}
              handleRetryWithNoCompreClash={handleRetryWithNoCompreClash}
            />
            //compre clash
          )}
          {/* {fetchedTable["error_code"] && (
          <Error1Component closeTimetable={closeTimetable} img={noTTError} mobileImg={NoTTErrorMobile} title="No timetable possible because of lecture
          and tutorial section selected" />
          // progress bar not sufficiently completed error
        )} */}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TimetableScreen;
