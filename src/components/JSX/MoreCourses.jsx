import React , {useState,useEffect} from "react";
import IconBook from "../../assets/IconBook.svg";
import IconBookWhite from "../../assets/IconBookWhite.svg";
import "../CSS/CDCs.css";

const MoreCourses = ({onCourseClick,courseIsSelectedGreen}) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("storedMoreCourses")) || [];
    setCourses(storedCourses);
  }, []);

  const courseClickUnique =(id)=>{
    onCourseClick(id);
  };

  return (
    <div className="courses-container">
      {courses.map((item) => (
        <div key={item.id} className={`course-div ${courseIsSelectedGreen(item.title) ? "courseIsSelectedGreen" : ""}`} onClick={()=> courseClickUnique(item.title)}>
          <img src={IconBookWhite} alt="book" />
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default MoreCourses;
