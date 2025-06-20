import React from "react";
import { FaUserGraduate, FaClipboardCheck, FaMoneyBillWave, FaCalendarAlt, FaLaptopCode, FaComments } from "react-icons/fa";
import "./FeatureSlider.css";

const FeatureSlider = () => {
  const features = [
    { name: "Student & Teacher Management", icon: <FaUserGraduate size={24} /> },
    { name: "Attendance Tracking", icon: <FaClipboardCheck size={24} /> },
    { name: "Fee Management", icon: <FaMoneyBillWave size={24} /> },
    { name: "Timetable & Scheduling", icon: <FaCalendarAlt size={24} /> },
    { name: "Online Exams & Results", icon: <FaLaptopCode size={24} /> },
    { name: "Communication Tools", icon: <FaComments size={24} /> },
  ];

  return (
    <div className="feature-slider-container">
      <h2 className="feature-title">Key Features</h2>
      <div className="feature-marquee">
        {features.concat(features).map((feature, index) => (
          <div key={index} className="feature-card">
            {feature.icon} <span>{feature.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSlider;
