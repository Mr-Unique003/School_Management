import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../layout/adminlayout/AdminLayout'
import './AdminDash.css'




const AdminDash = () => {
  const [studentCount, setStudentCount] = useState(0); 
  useEffect(() => {
    fetch("http://localhost:5000/students/all")
      .then(res => res.json())
      .then(data => setStudentCount(data.length))
      .catch(err => console.error("Error:", err));
  }, []);
  return (
    <div className='admincover'>
    <AdminLayout>
    <header className="top-bar">
        <h1>Welcome to Admin Panel</h1>
        <p>Here are your main modules</p>
      </header>
    <div className="dashboard-container">
      

      <section className="cards">
        <div className="card highlight">
          <h3>Manage Students</h3>
          <p>View, edit, or delete student records</p>
        </div>
        <div className="card highlight">
          <h3>Add Teacher</h3>
          <p>Add new teacher profiles to the system</p>
        </div>
        <div className="card highlight">
          <h3>Attendance Tracker</h3>
          <p>Monitor daily student attendance</p>
        </div>
        <div className="card highlight">
          <h3>Class Timetable</h3>
          <p>Manage and assign class schedules</p>
        </div>
        <div className="card highlight">
          <h3>Reports</h3>
          <p>Generate and export reports</p>
        </div>
        <div className="card highlight">
          <h3>Settings</h3>
          <p>Update system preferences</p>
        </div>
      </section>
    </div>
    </AdminLayout>
  </div>
      
  )
}

export default AdminDash
