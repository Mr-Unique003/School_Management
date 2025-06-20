import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import AdminLayout from "../../../layout/adminlayout/AdminLayout";
import "./studentlist.css";
import axios from "axios";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterSection, setFilterSection] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3002/students/all")
      .then((response) => {
        console.log("Fetched Students:", response.data);
        setStudents(response.data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      axios.delete(`http://localhost:3002/students/delete/${id}`)
        .then(() => {
          setStudents(students.filter((student) => student._id !== id));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleEdit = (student) => {
    setEditingStudent({
      ...student,
      dateOfBirth: student.dateOfBirth ? formatDateToDDMMYYYY(student.dateOfBirth) : "", // Ensure correct format
    });
  };  

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const handleUpdate = (id) => {
    const updatedStudent = {
      ...editingStudent,
      dateOfBirth: formatDateToYYYYMMDD(editingStudent.dateOfBirth), // Ensure correct format
    };
  
    axios.put(`http://localhost:3002/students/updateStudent/${id}`, updatedStudent)
      .then(() => {
        axios.get("http://localhost:3002/students/all") // Fetch updated student list
          .then((response) => {
            setStudents(response.data);
            setEditingStudent(null);
          })
          .catch((error) => console.error("Error fetching students after update:", error));
      })
      .catch((error) => console.error("Error updating student:", error));
  };  
  
  const formatDateToDDMMYYYY = (isoDate) => {
    if (!isoDate) return ""; // Prevents undefined errors
    if (isoDate.includes("/")) return isoDate; // If already in DD/MM/YYYY, return as is
  
    const [year, month, day] = isoDate.split("-"); // Convert YYYY-MM-DD to DD/MM/YYYY
    return `${day}/${month}/${year}`;
  };  
  
  const formatDateToYYYYMMDD = (ddmmyyyy) => {
    if (!ddmmyyyy || !ddmmyyyy.includes("/")) return ddmmyyyy; // Ensure valid input
    const parts = ddmmyyyy.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}/${month}/${day}`; // Return in YYYY-MM-DD format
    }
    return ddmmyyyy; // Return original value if incorrect format
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "dateOfBirth") {
      // Auto-format DoB to DD/MM/YYYY
      let formattedValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
      }
      if (formattedValue.length > 5) {
        formattedValue = formattedValue.slice(0, 5) + "/" + formattedValue.slice(5, 9);
      }
      if (formattedValue.length > 10) {
        formattedValue = formattedValue.slice(0, 10); // Ensure it doesn't exceed DD/MM/YYYY
      }
      setEditingStudent({ ...editingStudent, [name]: formattedValue });
    } else if (name === "mobileNumber") {
      // Allow only numbers and ensure max length of 10
      const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      if (numericValue.length <= 10) {
        setEditingStudent({ ...editingStudent, [name]: numericValue });
      }
    } else {
      setEditingStudent({ ...editingStudent, [name]: value });
    }
  };  

  const formatDate = (dobString) => {
    if (!dobString) return "";
    if (dobString.includes("-")) {
      // Convert from YYYY-MM-DD to DD/MM/YYYY
      const [year, month, day] = dobString.split("-");
      return `${day}/${month}/${year}`;
    } else if (dobString.includes("/")) {
      return dobString; // Already in DD/MM/YYYY format
    }
    return dobString;
  };  

  const filteredStudents = students.filter(student =>
    (student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || student._id.includes(searchTerm)) &&
    (filterClass === "" || student.studentClass === filterClass) &&
    (filterSection === "" || student.section === filterSection)
  );

  return (
    <div className="student_container">
      <AdminLayout>
        
        <div className="search-filter-container">
          <div className="head">
            <p>List of Students</p>
          </div>
          <div className="top_function">
          <input 
            type="text" 
            placeholder="Search by Name or ID" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
         
          <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
            <option value="">All Classes</option>
            {[...new Set(students.map(student => student.studentClass))].map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)}>
            <option value="">All Sections</option>
            {[...new Set(students.map(student => student.section))].map(sec => (
              <option key={sec} value={sec}>{sec}</option>
            ))}
          </select>
          </div>
        </div>
        <div className="studentTable">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Address</th>
                <th>Class</th>
                <th>Section</th>
                <th>Roll Number</th>
                <th>Mobile Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((user) => (
                <tr key={user._id}>
                  {editingStudent && editingStudent._id === user._id ? (
                    <>
                      <td>{user._id}</td>
                      <td><input type="text" name="fullName" value={editingStudent.fullName} onChange={handleChange} /></td>
                      <td><input type="text" name="dateOfBirth" value={editingStudent.dateOfBirth} onChange={handleChange} /></td>
                      <td><input type="email" name="email" value={editingStudent.email} onChange={handleChange} /></td>
                      <td><input type="text" name="address" value={editingStudent.address} onChange={handleChange} /></td>
                      <td><input type="text" name="studentClass" value={editingStudent.studentClass} onChange={handleChange} /></td>
                      <td><input type="text" name="section" value={editingStudent.section} onChange={handleChange} /></td>
                      <td><input type="text" name="rollNumber" value={editingStudent.rollNumber} onChange={handleChange} /></td>
                      <td><input type="tel" name="mobileNumber" value={editingStudent.mobileNumber} onChange={handleChange} /></td>
                      <td className="function">
                        <button className="btn update" onClick={() => handleUpdate(user._id)}>UPDATE</button>
                        <button className="btn cancel" onClick={handleCancelEdit}>CANCEL</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{user._id}</td>
                      <td>{user.fullName}</td>
                      <td>{formatDate(user.dateOfBirth)}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.studentClass}</td>
                      <td>{user.section}</td>
                      <td>{user.rollNumber}</td>
                      <td>{user.mobileNumber}</td>
                      <td className="function">
                        <button className="btn" onClick={() => handleEdit(user)}>
                          <FaEye className="read" />
                        </button>
                        <button className="btn" onClick={() => handleDelete(user._id)}>
                          <FaTrash className="delete" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      
    </div>
  );
};

export default StudentList;
