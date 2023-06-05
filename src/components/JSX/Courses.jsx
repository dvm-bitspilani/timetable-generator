import React from "react";
import Async from "react-async"
import Loader from "./Loader";
import CourseList from "./CourseList";

const onInputID = () =>{
  return fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates.json")
  .then(res => (res.ok ? res : Promise.reject(res)))
  .then(res => res.json())
};

const Courses = () => {
  return (
    <Async promiseFn={onInputID}>
      {({ data, error, isLoading }) => {
        if (isLoading) return <Loader />;
        if (error) return `Something went wrong: ${error.message}`;

        if (data) return <CourseList data={data} />;
        
        return null;
      }}
    </Async>
  );
};

export default Courses;
