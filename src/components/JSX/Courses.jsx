import React, { useState, useEffect, version } from "react";
import Loader from "./Loader";
import Error1Component from "../ErrorComponents/JSX/Error1Component";
import CourseList from "./CourseList";
import compreError from "../../assets/compreError.png";
import CompreErrorMobile from "../../assets/CompreErrorMobile.png";

const Courses = ({ inputValue, goToInput,setShowInputBox }) => {
  const [fetchedArray, setFetchedArray] = useState(null);
  const [sectionArray, setSectionArray] = useState([]);
  const [key2, setKey] = useState(0);
  const [cdcsdetail , setcdcsdetail]=useState([])

  const updateKey = () => {
    setKey((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions1 = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bits_id: inputValue }),
        };

        const response1 = await fetch(
          "https://timetable.bits-dvm.org/timetable/courses/",
          requestOptions1
        );
        const data1 = await response1.json();
        setTimeout(() => {
          setFetchedArray(data1);
        }, 1000);

        

        const cdcsArray = data1.cdcs;
        // console.log(cdcsArray);
        const storedMoreCourses = JSON.parse(
          localStorage.getItem("storedMoreCourses")
        );
        const matchingCourses = data1.courses.filter(
          (storedCourse) =>
            storedMoreCourses &&
            storedMoreCourses.some(
              (course) => course.course_no === storedCourse.course_no
            )
        );

        const request2Promises = cdcsArray.map((cdcsItem) => {
          const requestOptions2 = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ course_id: Object.values(cdcsItem)[2] }),
          };

          return fetch(
            "https://timetable.bits-dvm.org/timetable/sections/",
            requestOptions2
          )
            .then((response2) => response2.json())
            .then((data2) => {
              setcdcsdetail((prev) => [...prev , data2])
              return data2;
            });
        });

        const request3Promises = matchingCourses.map((matchingCourse) => {
          const requestOptions3 = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              course_id: Object.values(matchingCourse)[2],
            }),
          };

          return fetch(
            "https://timetable.bits-dvm.org/timetable/sections/",
            requestOptions3
          )
            .then((response3) => response3.json())
            .then((data3) => {
              return data3;
            });
        });

        const [sectionArray2, sectionArray3] = await Promise.all([
          Promise.all(request2Promises),
          Promise.all(request3Promises),
        ]);
        setSectionArray([...sectionArray2, ...sectionArray3]);
      } catch (error) {
        console.error("Error executing request1:", error);
      }
    };

    const timer = setTimeout(() => {
      fetchData();
    }, 0);
  }, [key2]);
  

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses =
      JSON.parse(localStorage.getItem("storedMoreCourses")) || [];
    setCourses(storedCourses);
  }, []);
  
  if (!fetchedArray) {
    return <Loader title="Getting Courses" />;
  }

  if (sectionArray.length >= 0) {
    return (
      <CourseList
      setShowInputBox={setShowInputBox}
        goToInput={goToInput}
        fetchedArray={fetchedArray}
        sectionArray={sectionArray}
        updateKey={updateKey}
        key2={key2}
        setSectionArray={setSectionArray}
        cdcsdetail={cdcsdetail}
      />
    );
  }
  // if (sectionArray.length < 1) {
  //   return (
  //     <Error1Component
  //       closeTimetable={goToInput}
  //       img={compreError}
  //       mobileImg={CompreErrorMobile}
  //       title="No courses found for the given ID"
  //       compreCheck={false}
  //     />
  //   );
  // }

  return null;
};

export default Courses;
