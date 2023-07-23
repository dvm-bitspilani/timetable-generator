import React, { useState } from "react";
import CrossIcon from "../../assets/IconCross.svg";
import "../CSS/DevPage.css";
import FrontLogo from "../../assets/HTML5Logo.svg";
import DesignLogo from "../../assets/FigmaLogo.svg";
import BackLogo from "../../assets/PythonLogo.svg";
import DevTeam from "./DevTeam";
import Luv from "../../assets/luv.jpg"
import Jay from "../../assets/jay-min.jpg"
import Bharat from "../../assets/bharat-min.jpg"
import Himanshu from "../../assets/hima-min.jpg"
import Sunpreet from "../../assets/sunpreet.jpg"
import Praneel from "../../assets/praneel-min.jpg"

const DevPage = ({ showDevs, showDev }) => {
  const designTeam = [
    { id: 1, name: "Sunpreet Brar", logo: `${Sunpreet}`, linkedin: "https://www.linkedin.com/in/sunpreet-brar-a7806a251", instagram: "https://instagram.com/sunpreetbrar?igshid=ZGUzMzM3NWJiOQ==" },
    { id: 2, name: "Praneel Maddula", logo: `${Praneel}`, github: "https://github.com/PraWater", linkedin: "https://www.linkedin.com/in/praneel-maddula-409421261/", behance: "https://www.behance.net/praneelmaddula", instagram: "https://instagram.com/praneel710?igshid=YmMyMTA2M2Y=" },
  ];
  const frontTeam = [
    { id: 1, name: "Bharat Raj Singal", logo: `${Bharat}`, github: "https://github.com/GeekWolf007", linkedin: "https://www.linkedin.com/in/bharatrajsingal000", instagram: "https://www.instagram.com/bharatrajsingal/" },
    { id: 2, name: "Jay Goyal", logo: `${Jay}`, github: "https://github.com/jay-goyal", linkedin: "https://www.linkedin.com/in/jay-goyal-41395b224/", instagram: "https://www.instagram.com/jay.goyal.03/", desc: "(Team Lead)" },
    { id: 3, name: "Luv Gupta", logo: `${Luv}`, github: "https://github.com/LuvGuptaa", linkedin: "https://www.linkedin.com/in/luv-guptaa/", instagram: "https://www.instagram.com/luv_guptaa_/" },
  ];
  const backTeam = [
    { id: 1, name: "Himanshu Kumar", logo: `${Himanshu}`, github: "https://www.github.com/Zendovo", linkedin: "https://www.linkedin.com/in/himanshu-kumar-679ab31b0", instagram: "https://www.instagram.com/himanshuuuk/" },
  ];
  const [showDevTeam, setShowDevTeam] = useState(false);
  const [currentTeam, setCurrentTeam] = useState("");
  const [teamData, setTeamData] = useState([]);
  const showTeam = (team) => {
    if (showDevTeam === false) {
      setShowDevTeam(true);
      setCurrentTeam(team.target.id);
      if (team.target.id == "Frontend Team") {
        setTeamData(frontTeam);
      } else if (team.target.id == "Backend Team") {
        setTeamData(backTeam);
      } else if (team.target.id == "Design Team") {
        setTeamData(designTeam);
      }
    } else {
      setShowDevTeam(false);
      setCurrentTeam("");
      setTeamData([]);
    }
  };
  console.log;
  return (
    <>
      {showDevTeam ? (
        <DevTeam
          showTeam={showTeam}
          currentTeam={currentTeam}
          teamArray={teamData}
          showDev={showDev}
        />
      ) : (
        <div className="dev-wrapper" onClick={showDev}>
          <div className="dev-container">
            <h1 className="dev-title">Developers</h1>
            <img
              src={CrossIcon}
              alt=""
              onClick={showDevs}
              className="dev-cross-btn"
            />
            <div className="dev-teams-wrapper">
              <div className="dev-teams">
                <div id="Design Team" className="team">
                  <div
                    id="Design Team"
                    className="team-logo"
                    onClick={showTeam}
                  >
                    <img id="Design Team" src={DesignLogo} alt="Team" />
                  </div>
                  <p>Design</p>
                </div>

                <div id="Frontend Team" className="team">
                  <div
                    id="Frontend Team"
                    className="team-logo"
                    onClick={showTeam}
                  >
                    <img id="Frontend Team" src={FrontLogo} alt="Team" />
                  </div>
                  <p>Front-End</p>
                </div>

                <div id="Backend Team" className="team">
                  <div
                    id="Backend Team"
                    className="team-logo"
                    onClick={showTeam}
                  >
                    <img id="Backend Team" src={BackLogo} alt="Team" />
                  </div>
                  <p>Back-End</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DevPage;
