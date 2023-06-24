import React from 'react'
import "../CSS/TableCell.css"
import LocationIcon from "../../assets/IconLocation.svg"
import HashtagIcon from "../../assets/IconHashtag.svg"

const TableCell = ({courseTitle, courseSection, courseRoom, cellColor}) => {
  return (
    <>
        <div className="cell-cover" style={{background: '#7BAF6C'}}>
            <div className="cell-heading">PHY F111</div>
            <div className="cell-content">
            <div className="cell-section">
                <img src={HashtagIcon} alt="Hashtag" />
                <p>L1</p>
            </div>
            <div className="cell-room">
                <img src={LocationIcon} alt="Location" />
                <p>5101</p>
            </div>
            </div>
        </div>
    </>
  )
}

export default TableCell