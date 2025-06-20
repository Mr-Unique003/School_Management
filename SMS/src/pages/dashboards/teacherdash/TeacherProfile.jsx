// import { useEffect, useState } from "react";
// import axios from "axios";
// import TeacherLayout from "../../layout/teacherlayout/TeacherLayout";

// const TeacherProfile = () => {
//   const [teacher, setTeacher] = useState(null);

//   // Get mobileNumber and dateOfBirth from localStorage (assuming they're stored after login)
//   const mobileNumber = localStorage.getItem("mobileNumber");
//   const dateOfBirth = localStorage.getItem("dateOfBirth");

//   useEffect(() => {
//     if (mobileNumber) {
//       axios
//         .get(`http://localhost:3002/getTeacher/${mobileNumber}`)
//         .then((response) => {
//           setTeacher(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching teacher profile:", error);
//         });
//     }
//   }, [mobileNumber]);
  
//   if (!teacher) {
//     return <p>Loading profile...</p>;
//   }

//   return (
//    <TeacherLayout>
//     <div>
//     <div>
//       <h2>Teacher Profile</h2>
//       <p><strong>Full Name:</strong> {teacher.fullName}</p>
//       <p><strong>Date of Birth:</strong> {teacher.dateOfBirth}</p>
//       <p><strong>Email:</strong> {teacher.email}</p>
//       <p><strong>Address:</strong> {teacher.address}</p>
//       <p><strong>Qualification:</strong> {teacher.qualification}</p>
//       <p><strong>Mobile Number:</strong> {teacher.mobileNumber}</p>
//     </div>
    
    
//    </div>
//    </TeacherLayout>

//   );  
// };

// export default TeacherProfile;

import { useEffect, useState } from "react";
import axios from "axios";
import TeacherLayout from "../../layout/teacherlayout/TeacherLayout";
import './profile.css'

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState(null);

  // Get mobileNumber from localStorage (assuming it's stored after login)
  const mobileNumber = localStorage.getItem("mobileNumber");

  useEffect(() => {
    if (mobileNumber) {
      console.log("Fetching teacher profile for Mobile Number:", mobileNumber); // Debugging log
      
      axios
        .get(`http://localhost:3002/TeacherProfile/${mobileNumber}`)
        .then((response) => {
          console.log("Teacher profile data:", response.data); // Debugging log
          setTeacher(response.data);
        })
        .catch((error) => {
          console.error("Error fetching teacher profile:", error);
        });
    } else {
      console.error("No mobileNumber found in localStorage");
    }
  }, [mobileNumber]);

  if (!teacher) {
    return <p>Loading profile...</p>;
  }

  return (
     <TeacherLayout>
      <div className="profilecontainer">
      <div className="teacher-profile">
        <h2>Teacher Profile</h2>
        <p><strong>Full Name:</strong> {teacher.fullName}</p>
        <p><strong>Date of Birth:</strong> {teacher.dateOfBirth}</p>
        <p><strong>Email:</strong> {teacher.email}</p>
        <p><strong>Address:</strong> {teacher.address}</p>
        <p><strong>Qualification:</strong> {teacher.qualification}</p>
        <p><strong>Mobile Number:</strong> {teacher.mobileNumber}</p>
      </div>
      </div>
     </TeacherLayout>
  );
};

export default TeacherProfile;
