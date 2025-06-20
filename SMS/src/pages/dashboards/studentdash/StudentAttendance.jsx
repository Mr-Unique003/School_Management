import React from "react";
import { Link } from "react-router-dom";
import StudentLayout from "../../layout/studentlayout/StudentLayout";

const StudentAttendance = () => {
  return (
    <StudentLayout>
      <div className="attendance">
      <h2>Student Attendance</h2>
      <p>Attendance records will be displayed here.</p>
      <ul>
      <li><Link to="/">Attendance1</Link></li>
      <li><Link to="/">Attendance2</Link></li>
      <li><Link to="/">Attendance3</Link></li>
      <li><Link to="/">Attendance4</Link></li>
      </ul>
    </div>
    </StudentLayout>
  );
};

export default StudentAttendance;

