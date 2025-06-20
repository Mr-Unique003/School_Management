import { useEffect, useState } from "react";
import axios from "axios";
import StudentLayout from "../../layout/studentlayout/StudentLayout";
import "./StudentProfile.css"

const StudentProfile = () => {
  const [student, setStudent] = useState(null);

  // Get studentId from localStorage
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (studentId) {
      console.log("Fetching student profile for ID:", studentId); // Debugging log

      axios
        .get(`http://localhost:3002/StudentProfile/${studentId}`)
        .then((response) => {
          console.log("Student profile data:", response.data); // Debugging log
          setStudent(response.data);
        })
        .catch((error) => {
          console.error("Error fetching student profile:", error);
        });
    } else {
      console.error("No studentId found in localStorage");
    }
  }, [studentId]);

  if (!student) {
    return <p>Loading profile...</p>;
  }

  return (
     <StudentLayout>
      <div className="student">
      <div className="profile_stud">
        <h2>Student Profile</h2>
        <p><strong>ID:</strong> {student._id}</p>
        <p><strong>Full Name:</strong> {student.fullName}</p>
        <p><strong>Date of Birth:</strong> {student.dateOfBirth}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Address:</strong> {student.address}</p>
        <p><strong>Class:</strong> {student.studentClass}</p>
        <p><strong>Section:</strong> {student.section}</p>
        <p><strong>Roll Number:</strong> {student.rollNumber}</p>
        <p><strong>Mobile Number:</strong> {student.mobileNumber}</p>
      </div>
      </div>
     </StudentLayout>
  );
};

export default StudentProfile;
