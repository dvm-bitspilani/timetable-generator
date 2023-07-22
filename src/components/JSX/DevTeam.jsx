import React, { useState } from "react";
import CrossIcon from "../../assets/IconCross.svg";
const DevTeam = ({ showTeam, currentTeam, teamArray ,showDev  }) => {
  return (
    <>
      <div className="dev-wrapper" onClick={showDev}>
        <div className="dev-container">
          <h1 className="dev-title">{currentTeam}</h1>
          <img
            id="cross-icon"
            src={CrossIcon}
            alt=""
            className="dev-cross-btn"
            onClick={showTeam}
          />
          <div className="dev-teams-wrapper">
            <div className="dev-teams">
              {teamArray.map((item) => (
                <div key={item.id} className="team">
                  <div className="team-logo">
                    <img src={item.logo} alt="Team" />
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DevTeam;
