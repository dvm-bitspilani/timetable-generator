import React, {useEffect} from "react";
import "../CSS/Lectures.css";

const Tutorials = ({courseId}) =>{

  const tutorialArray = [
    {id:1, lecture: "T 1" , room: 6101 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"},
    {id:2, lecture: "T 2" , room: 6102 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"},
    {id:3, lecture: "T 3" , room: 6103 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"},
    {id:4, lecture: "T 4" , room: 6104 , faculty: "Prof Shivang Rai", hours: "0900Hrs - 0950Hrs"}
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

  const onTutorialClick = (e) =>{
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
  const onTutorialClick2 = (e) =>{
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
    <div className="lectures">
      <div className="lectures-container">
        {tutorialArray.map(item=>(
          <div key={item.id} id={`tutorial-card${item.id}${courseId.replace(/ +/g, "")}`} className="lecture-card">
            <div className="lecture-room">
              <h3 className="font-weight-600" onClick={onTutorialClick2}>{item.lecture}</h3>
              <h3 className="font-weight-500" onClick={onTutorialClick2}>{item.room}</h3>
            </div>
            <h2 onClick={onTutorialClick}>{item.faculty}</h2>
            <h2 className="margin-bottom-1rem" onClick={onTutorialClick}>{item.hours}</h2>
          </div>
        ))}
      </div>
      <div className="want-or-not-container">

      </div>
    </div>
  )
};

export default Tutorials;