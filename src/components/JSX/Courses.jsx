import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import CourseList from "./CourseList";

const Courses = ({ inputValue }) => {
  const [fetchedArray, setFetchedArray] = useState(null);
  const [sectionArray, setSectionArray] = useState([]);
  const [key2 , setKey] = useState(0);
  // console.log(key);

  const updateKey = () => {
    setKey(prev=>prev+1);
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
        setFetchedArray(data1);
  
        const cdcsArray = data1.cdcs;
        const storedMoreCourses = JSON.parse(
          localStorage.getItem("storedMoreCourses")
        );
        const matchingCourses = data1.courses.filter((storedCourse) =>
          storedMoreCourses && storedMoreCourses.some(
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
  
    const delay = 2000; 
    const timer = setTimeout(() => {
      fetchData();
    }, delay);
  }, [key2]);
  
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses =
      JSON.parse(localStorage.getItem("storedMoreCourses")) || [];
    setCourses(storedCourses);
  }, []);
    

  if (!fetchedArray) {
    return <Loader />;
  }

  if (sectionArray.length > 0) {
    console.log(fetchedArray);
    console.log(sectionArray);
    console.log(key2);
    return (
      <CourseList fetchedArray={fetchedArray} sectionArray={sectionArray} updateKey={updateKey} key2={key2} />
    );
  }

  return null;
};

export default Courses;
