import React from 'react';
import Async from 'react-async';
import Loader from './Loader';
import CourseList from './CourseList';


const Courses = ({ inputValue }) => {

  const onInputID = () => {
    const delay = 1800;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bits_id: `${inputValue}`}),
    };
  
    return new Promise((resolve) => {
      setTimeout(() => {
        fetch('https://timetable.bits-dvm.org/timetable/courses/', requestOptions)
          .then((response) => response.json())
          .then((data) => {
            const fetchedArray = data;
  
            console.log('fetchedArray:', fetchedArray);
            resolve(data);
          })
          .catch((error) => {
            console.error('An error occurred:', error);
            resolve({ error }); 
          });
      }, delay);
    });
  };
  

  // console.log(inputValue);
  return (
    <Async promiseFn={onInputID}>
      {({ data, error, isLoading }) => {
        if (isLoading) return <Loader />;
        if (error) return `Something went wrong: ${error.message}`;

        if (data) return <CourseList fetchedArray={data} />;

        return null;
      }}
    </Async>
  );
};

export default Courses;
