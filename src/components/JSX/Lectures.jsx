import React ,{useEffect} from "react";
import "../CSS/Lectures.css";

const Lectures = ({courseId}) =>{

  const lectureArray = [
    {id:1, lecture: "L 1" , room: 5101 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"},
    {id:2, lecture: "L 2" , room: 5102 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"},
    {id:3, lecture: "L 3" , room: 5103 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"},
    {id:4, lecture: "L 4" , room: 5104 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"}
  ];

  useEffect(() => {
    const storedDivs = JSON.parse(localStorage.getItem('clickedDivs')) || [];
    storedDivs.forEach(divId => {
      const targetDiv = document.getElementById(divId);
      if (targetDiv) {
        targetDiv.classList.add('lecture-card-selected');
      }
    });
  }, []);

  const onLectureClick = (e) =>{
    const targetDiv = e.currentTarget.parentElement;
    if (targetDiv.className === "lecture-card") {
      targetDiv.className = "lecture-card lecture-card-selected";

      let storedDivs = JSON.parse(localStorage.getItem('clickedDivs')) || [];
      storedDivs.push(targetDiv.id);
      localStorage.setItem('clickedDivs', JSON.stringify(storedDivs));
      
    } else if (targetDiv.className === "lecture-card lecture-card-selected") {
      targetDiv.className = "lecture-card";

      let storedDivs = JSON.parse(localStorage.getItem('clickedDivs')) || [];
      const index = storedDivs.indexOf(targetDiv.id);
      if (index > -1) {
        storedDivs.splice(index, 1);
        localStorage.setItem('clickedDivs', JSON.stringify(storedDivs));
      }
    }
  };
  const onLectureClick2 = (e) =>{
    const targetDiv = e.currentTarget.parentElement.parentElement;
    if (targetDiv.className === "lecture-card") {
      targetDiv.className = "lecture-card lecture-card-selected";

      let storedDivs = JSON.parse(localStorage.getItem('clickedDivs')) || [];
      storedDivs.push(targetDiv.id);
      localStorage.setItem('clickedDivs', JSON.stringify(storedDivs));

    } else if (targetDiv.className === "lecture-card lecture-card-selected") {
      targetDiv.className = "lecture-card";

      let storedDivs = JSON.parse(localStorage.getItem('clickedDivs')) || [];
      const index = storedDivs.indexOf(targetDiv.id);
      if (index > -1) {
        storedDivs.splice(index, 1);
        localStorage.setItem('clickedDivs', JSON.stringify(storedDivs));
      }
    }
  };


  return(
    <div className="lectures" id={courseId}>
      <div className="lectures-container">
        {lectureArray.map(item=>(
          <div key={item.id} id={`lecture-card${item.id}${courseId.replace(/ +/g, "")}`} className="lecture-card">
            <div className="lecture-room">
              <h3 className="font-weight-600" onClick={onLectureClick2}>{item.lecture}</h3>
              <h3 className="font-weight-500" onClick={onLectureClick2}>{item.room}</h3>
            </div>
            <h2 onClick={onLectureClick}>{item.faculty}</h2>
            <h2 className="margin-bottom-1rem" onClick={onLectureClick}>{item.hours}</h2>
          </div>
        ))}
      </div>
      <div className="want-or-not-container">

      </div>
    </div>
  )
};

export default Lectures;