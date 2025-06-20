import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StudentSidebar.css"; // Import CSS file

const StudentSidebar = () => {
  const navigate= useNavigate()
  const Logout = (e) => {
    const confirmLogout = window.confirm("Do you really want to logout?");
    e.preventDefault();
    if (confirmLogout) {

    navigate('/')
     window.history.pushState(null, null, window.location.href);
     window.onpopstate = function () {
         window.history.go(1);
     }
  }
}
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/StudentProfile">Profile</Link></li>
        <li><Link to="/StudentAdmission">Admission</Link></li>
        <li><Link to="/StudentMarksheet">Marksheet</Link></li>
        <li><Link to="/Student/Notice">Notice</Link></li>
        <li><Link onClick={Logout}>Logout</Link></li>
      </ul>
    </nav>
  );
};

export default StudentSidebar;
