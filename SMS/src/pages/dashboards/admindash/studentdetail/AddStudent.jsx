import { useState } from "react";
import axios from "axios";
import AdminLayout from "../../../layout/adminlayout/AdminLayout";
import {Link} from 'react-router-dom'
import './addstudent.css'

const AddStudent = () => {
  const [formData, setFormData] = useState({
    _id: "",
    fullName: "",
    dateOfBirth: "",
    email: "",
    address: "",
    studentClass: "",
    section: "",
    rollNumber: "",
    mobileNumber: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateOfBirth") {
      // Auto-format Date of Birth (DD/MM/YYYY)
      let formattedValue = value.replace(/\D/g, ""); // Remove non-digits
      if (formattedValue.length > 2) formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5) + "/" + formattedValue.slice(5, 9);
      if (formattedValue.length > 10) formattedValue = formattedValue.slice(0, 10); // Limit to 10 chars
      setFormData({ ...formData, [name]: formattedValue });
    } 
    else if (name === "mobileNumber") {
      // Allow only numbers and limit to 10 digits
      const mobile = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: mobile });
    } 
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    if (formData.mobileNumber.length !== 10) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3002/students/add", {
        ...formData,
      });
      console.log("Response:", response.data);
      setSuccess("Student added successfully!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      console.error("Add Student Error:", err.response?.data || err);
      setError(err.response?.data?.message || "Failed to add student.");
    }
  };
  
  return (
    <AdminLayout>
      <div className="add-student-container" >
        <h2>Add Student</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <form onSubmit={handleSubmit} className="add-student-form">
          <input type="text" name="_id" value={formData._id} onChange={handleChange} placeholder="Student ID" required />
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
          <input type="text" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="DD/MM/YYYY" required maxLength="10" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
          <select name="studentClass" value={formData.studentClass} onChange={handleChange} placeholder="Class"  id="Select CLass" required>
          <option value="">--Please choose the class--</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select name="section" value={formData.section} onChange={handleChange} placeholder="Section"  id="" required>
          <option value="">--Please choose the section--</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          </select>
          
          
          <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} placeholder="Roll Number" required />
          <input type="text" name="mobileNumber" maxLength={10} value={formData.mobileNumber} onChange={handleChange} placeholder="Mobile Number" required maxLength="10" />
          <button type="submit">Add Student</button>
          <Link to="/Student/MultiAdd">Click here to add excel documents</Link>
        </form>

        
      </div>
    </AdminLayout>
  );
};

export default AddStudent;
