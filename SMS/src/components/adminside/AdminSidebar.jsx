import React from 'react'
import './AdminSidebar.css';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate} from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const [activeIndex, setactiveIndex] = useState(0);

  const [isMenu1Open, setMenu1Open] = useState(false);
  const [isMenu2Open, setMenu2Open] = useState(false);
  const [isMenu3Open, setMenu3Open] = useState(false);

  // Toggle functions
  const toggleMenu1 = () => setMenu1Open(!isMenu1Open);
  const toggleMenu2 = () => setMenu2Open(!isMenu2Open);
  const toggleMenu3 = () => setMenu3Open(!isMenu3Open);

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    switch (location.pathname){
      case "/AdminDashboard":
        setactiveIndex(0);
        break;
      case "/Admin/StudentDetail":
        setactiveIndex(1);
        break;
      case "/Admin/TeacherDetail":
        setactiveIndex(2);
        break;

        default:
        setactiveIndex(0);
      
    }
  })
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
    <div>
      <nav className='sidebar'>
        <ul>
          <li><Link to="/AdminDashboard">Dashboard</Link></li>
        <div className="dropdown">
        <li onClick={toggleMenu1}>
            Student {isMenu1Open ? '▲' : '▼'}
        </li>
        {isMenu1Open && (
          <ul className="drop">
            <li><Link to="/Admin/StudentDetail">Student Details</Link></li>
            <li><Link to="/Admin/AddStudent">Add New Student</Link></li>
          </ul>
        )}
        </div>

        <div className="dropdown"> <li onClick={toggleMenu2}>
          Teacher {isMenu2Open ? '▲' : '▼'}
        </li>
        {isMenu2Open && (
          <ul className="drop">
            <li><Link to="/Admin/TeacherDetail">Teacher Details</Link></li>
            <li><Link to="/Admin/AddTeacher">Add New Teacher</Link></li>
          </ul>
        )}
            </div>
        
              <li><Link to="/AdminMarksheet">Marksheet</Link></li>              
              <li><Link to="/AddNotice">Notice</Link></li>
                
              
              <li><Link to onClick={Logout}>Logout</Link></li>
              
  


        </ul>
        
      
    </nav>
    </div>
  )
}

export default AdminSidebar
