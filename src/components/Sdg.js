// Sdg.js
import React, { useState, useEffect } from "react";
import "./sdg.css";
import house from "./assets/home.png";
import city from "./assets/safe_space.png";
import disaster from "./assets/disas.png";
import saveThePlanet from "./assets/environment.png";
import group from "./assets/tour.png";
import shipped from "./assets/transport.png";
import historic from "./assets/heri.png";
import cityscape from "./assets/urban.png";
import testament from "./assets/rescue.png";
import planning from "./assets/plan.png";
import sex_ratio from "./assets/sex-ratio.png";
import electricity from "./assets/electricity.png";
import socio from "./assets/diversity.png";
import crime from "./assets/crime-scene.png";
import education from "../components/KnowYourCity/KnowImages/education.png";
import health from "./assets/healthcare.png";
import SdgCard from "./SdgCard";
import Header from "./Header";
import OtherIndicator from "./OtherIndicator";

const Sdg = () => {
  const [showMore, setShowMore] = useState(localStorage.getItem("showMore") === "true");
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    localStorage.setItem("showMore", showMore);
  }, [showMore]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleCardClick = (departmentName) => {
    setSelectedDepartment(departmentName);
  };

  const sdgs = [
    {
      title: "Safe and affordable housing",
      link: "/csi/housing",
      photo: house,
      description: 98.35,
    },
    {
      title: "Affordable and sustainable transport systems",
      link: "/csi/transport",
      photo: shipped,
      description: 100,
    },
    {
      title: "Inclusive and sustainable urbanization",
      link: "#",
      photo: cityscape,
      description: 78.57,
    },
    {
      title: "Protect the world's cultural and natural heritage",
      link: "#",
      photo: historic,
      description: 100,
    },
    {
      title: "Reduce the adverse effects of natural disasters",
      link: "#",
      photo: disaster,
      description: 20,
    },
    {
      title: "Reduce the environmental impacts of cities",
      link: "/csi/environment",
      photo: saveThePlanet,
      description: 64.28,
    },
    {
      title: "Provide access to safe and inclusive green and public spaces",
      link: "#",
      photo: city,
      description: 40,
    },
    {
      title: "Strong national and regional development planning",
      link: "#",
      photo: planning,
      description: 100,
    },
    {
      title: "Implement policies for inclusion, resource efficiency and disaster risk reduction",
      link: "#",
      photo: testament,
      description: 100,
    },
    {
      title: "Tourist Influx",
      link: "/csi/tourism",
      photo: group,
      description: 71.42,
    },
    {
      title: "Gender Equality",
      link: "/csi/more-indicators",
      photo: sex_ratio,
      description: 20,
      departmentName: "sexRatio",
    },
    {
      title: "Modern Energy",
      link: "/csi/more-indicators",
      photo: electricity,
      description: 70,
      departmentName: "electricity",
    },
    {
      title: "Socio-Cultural Activities",
      link: "/csi/more-indicators",
      photo: socio,
      description: 90,
      departmentName: "socioCulture",
    },
    {
      title: "Crime Report",
      link: "/csi/more-indicators",
      photo: crime,
      description: 90,
      departmentName: "crime",
    },
    {
      title: "Healthy Lives",
      link: "/csi/more-indicators",
      photo: health,
      description: 90,
      departmentName: "healthcare",
    },
    {
      title: "Quality Education",
      link: "/csi/more-indicators",
      photo: education,
      description: 90,
      departmentName: "education",
    },
  ];

  return (
    <div className="sdg-main">
      <Header />
      <div className="sdg-main-container">
        {!showMore && (
          <>
            <div className="sdg-container">
              {sdgs.slice(0, 5).map((sdg, index) => (
                <SdgCard sdg={sdg} key={index} />
              ))}
            </div>
            <div className="page-title">
            <h1>City&nbsp;<span class="space"> Sustainability Index</span></h1>
            </div>
            <div className="sdg-container">
              {sdgs.slice(5, 10).map((sdg, index) => (
                <SdgCard sdg={sdg} key={5 + index} />
              ))}
            </div>
          </>
        )}
        {!showMore && (
          <div className="view-btn">
            <button onClick={toggleShowMore}>View More</button>
          </div>
        )}
        {showMore && (
          <div className="view-btn">
            <button onClick={toggleShowMore}>Show Less</button>
          </div>
        )}
        <div className="sdg-container">
          {showMore && sdgs.slice(10).map((sdg, index) => (
            <div key={10 + index} className="not-sdg-container" onClick={() => handleCardClick(sdg.departmentName)}>
              <div className="not-sdg-card">
                <div className="not-sdg-content">
                  <img src={sdg.photo} className="sdg-logo" alt={sdg.title} />
                </div>
              </div>
              <h2 className="sdg-title">{sdg.title}</h2>
            </div>
          ))}
        </div>
        
        {showMore && selectedDepartment && <OtherIndicator departmentName={selectedDepartment} />}
      </div>
    </div>
  );
};

export default Sdg;
