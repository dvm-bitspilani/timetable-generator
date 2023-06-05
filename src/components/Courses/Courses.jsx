import React from "react";
import Async from "react-async"
import Loader from "./Loader";

const onInputID = () =>{
  fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => (res.ok ? res : Promise.reject(res)))
  .then(res => res.json())
};

const Courses = () => {
  <Async promiseFn={onInputID}>
    {({ data, err, isLoading }) => {
      if (isLoading) return <Loader />;
      if (err) return `Something went wrong: ${err.message}`;

      if (data)
        return (
          <CourseList />
        );
    }}
  </Async>;
};

export default Courses;
