// import React from "react";

// const StudentAdmission = () => {
//   return (
//     <div>
//       <h2>Admission Details</h2>
//       <p>Student admission details will be displayed here.</p>
//     </div>
//   );
// };

// export default StudentAdmission;

import React, { useState } from "react";
import axios from "axios";
import StudentLayout from "../../layout/studentlayout/StudentLayout";

const StudentAdmission = () => {
  const studentId = localStorage.getItem("studentId");
  const [paymentStatus, setPaymentStatus] = useState("pending");

  const handlePayment = async () => {
    try {
      // Mock Payment Integration (Replace with actual payment gateway)
      alert("Redirecting to payment...");
      setTimeout(() => {
        setPaymentStatus("completed");
        alert("Payment Successful!");
      }, 2000);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const handleAdmission = async () => {
    if (paymentStatus !== "completed") {
      alert("Please complete the payment first!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/admission", { studentId });
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting admission:", error);
    }
  };

  return (
    // <StudentLayout>
      <div>
        <h2>Student Admission</h2>
        <p><strong>Student ID:</strong> {studentId}</p>
        
        {paymentStatus === "pending" ? (
          <button onClick={handlePayment}>Pay Admission Fee</button>
        ) : (
          <button onClick={handleAdmission}>Complete Admission</button>
        )}
      </div>
    // </StudentLayout>
  );
};

export default StudentAdmission;
