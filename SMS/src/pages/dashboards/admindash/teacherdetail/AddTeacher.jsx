import { useState } from "react";
import axios from "axios";
import AdminLayout from "../../../layout/adminlayout/AdminLayout";
import { Link } from "react-router-dom";
import './add_teacher.css'

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    address: "",
    qualification: "",
    mobileNumber: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateOfBirth") {
      let formattedValue = value.replace(/\D/g, ""); // Remove non-digits
      if (formattedValue.length > 2) formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
      if (formattedValue.length > 5) formattedValue = formattedValue.slice(0, 5) + "/" + formattedValue.slice(5, 9);
      if (formattedValue.length > 10) formattedValue = formattedValue.slice(0, 10); // Limit to 10 chars
      setFormData({ ...formData, [name]: formattedValue });
    } else if (name === "mobileNumber") {
      const mobile = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: mobile });
    } else {
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
      const response = await axios.post("http://localhost:3002/teachers/add", formData);
      console.log("Response:", response.data);
      setSuccess("Teacher added successfully!");
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      console.error("Add Teacher Error:", err.response?.data || err);
      setError(err.response?.data?.message || "Failed to add teacher.");
    }
  };

  return (
    <AdminLayout>
      <div className="add-teacher-container">
        <h2>Add Teacher</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <form onSubmit={handleSubmit} className="add-teacher-form">
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
          <input type="text" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="DD/MM/YYYY" required maxLength="10" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
          <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Qualification" required />
          <input type="text" name="mobileNumber" maxLength={10}  value={formData.mobileNumber} onChange={handleChange} placeholder="Mobile Number" required maxLength="10" />
          <button type="submit">Add Teacher</button>
          <Link to="/Teacher/MultiAdd">Click here to add excel documents</Link>
        </form>
        
      </div>
    </AdminLayout>
  );
};

export default AddTeacher;
