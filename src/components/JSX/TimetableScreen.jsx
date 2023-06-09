import React, { useEffect, useState } from "react";
import "../CSS/TimetableScreen.css";
import Timetable from "./Timetable";
import LoaderIcon from "./LoaderIcon";
import DownloadIcon from "../../assets/IconDownload.svg"

const TimetableScreen = ({sectionArray , courseUnits , freeDay}) =>{

  const [fetchedTable, setFetchedTable] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const fetchData =async ()=>{
      const courses = sectionArray.map(item => {
        const item_title = Object.values(item)[2].replace(/\s/g, "");
      
        const wantedSections = JSON.parse(localStorage.getItem("wantedSections"));
        const unWantedSections = JSON.parse(localStorage.getItem("unwantedSections"));
      
        let lecDesired = 0;
        const lecSec = [];
        let tutDesired = 0;
        const tutSec = [];
        let pracDesired = 0;
        const pracSec = [];
      
        if (wantedSections.some(section => section.startsWith('L') && section.split('-')[1] === item_title)) {
          lecDesired = 1;
          wantedSections.filter(section => section.startsWith('L') && section.split('-')[1] === item_title)
            .forEach(section => {
              lecSec.push(parseInt(section.split('-').pop()));
            });
        } else if (unWantedSections.some(section => section.startsWith('L') && section.split('-')[1] === item_title)) {
          lecDesired = 0;
          unWantedSections.filter(section => section.startsWith('L') && section.split('-')[1] === item_title)
            .forEach(section => {
              lecSec.push(parseInt(section.split('-').pop()));
            });
        }
        if (wantedSections.some(section => section.startsWith('T') && section.split('-')[1] === item_title)) {
          tutDesired = 1;
          wantedSections.filter(section => section.startsWith('T') && section.split('-')[1] === item_title)
            .forEach(section => {
              tutSec.push(parseInt(section.split('-').pop()));
            });
        } else if (unWantedSections.some(section => section.startsWith('T') && section.split('-')[1] === item_title)) {
          tutDesired = 0;
          unWantedSections.filter(section => section.startsWith('T') && section.split('-')[1] === item_title)
            .forEach(section => {
              tutSec.push(parseInt(section.split('-').pop()));
            });
        }
        if (wantedSections.some(section => section.startsWith('P') && section.split('-')[1] === item_title)) {
          pracDesired = 1;
          wantedSections.filter(section => section.startsWith('P') && section.split('-')[1] === item_title)
            .forEach(section => {
              pracSec.push(parseInt(section.split('-').pop()));
            });
        } else if (unWantedSections.some(section => section.startsWith('P') && section.split('-')[1] === item_title)) {
          pracDesired = 0;
          unWantedSections.filter(section => section.startsWith('P') && section.split('-')[1] === item_title)
            .forEach(section => {
              pracSec.push(parseInt(section.split('-').pop()));
            });
        }
      
        return {
          course_id: Object.values(item)[0],
          lecture: {
            desired: lecDesired,
            sec: lecSec
          },
          tutorial: {
            desired: tutDesired,
            sec: tutSec
          },
          practical: {
            desired: pracDesired,
            sec: pracSec
          },
          misc: {
            desired: 0,
            sec: []
          }
        };
      });
    
      const requestOption = {
        "number": 50, 
        "free_day": `${freeDay}`,
        "courses": courses,
        "compre_check": true
      }
      const requestOptionsFinal = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestOption),
      };    
      
    
        const response = await fetch( "https://mocki.io/v1/d4eea6e2-5092-4842-8b1d-5b7dd5ef89a8");
        const data = await response.json();
        setTimeout(() => {
          setIsLoading(false);
          
        }, 2000);
        console.log(data)
        setFetchedTable(data);
    };

      setTimeout(() => {
        fetchData();
      }, 0);
  },[])


  return(
    <>
    {isLoading? <LoaderIcon title="Generating Timetables" /> :
    (<>
      <h1 className="units-heading">Units Taken: <span>{courseUnits}</span></h1>
      <p className="units-paragraph">If you don’t see a section here, it must be because the hours and days are empty in the original TT provided by AUGSD</p>
      
      <div className="table-container">
        <Timetable timetableData={fetchedTable} />
      </div>
      <p className="units-paragraph margin-bottom-05">Scroll for more variations</p>
      <p className="units-paragraph margin-bottom-325">50 is the max number of timetables shown here</p>
    </>)
    }
    </>
  );
};

export default TimetableScreen;