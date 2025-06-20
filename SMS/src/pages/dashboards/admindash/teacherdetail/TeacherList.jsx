import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import TeacherSidebar from "../../../../components/teacherside/TeacherSidebar";
import AdminLayout from "../../../layout/adminlayout/AdminLayout";
import "./teacherlist.css";
import axios from "axios";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterQualification, setFilterQualification] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3002/teachers/all")
      .then((response) => {
        console.log("Fetched teachers:", response.data); // <- Add this
        setTeachers(response.data);
      })
      .catch((err) => console.error("Error fetching teachers:", err));
  }, []);
  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      axios.delete(`http://localhost:3002/teachers/delete/${id}`)
      .then(() => setTeachers(teachers.filter((teacher) => teacher._id !== id)))
      .catch((err) => console.log(err));
    }
  };

  const handleEdit = (teacher) => {
    setEditingTeacher({
      ...teacher,
      dateOfBirth: teacher.dateOfBirth ? formatDateToDDMMYYYY(teacher.dateOfBirth) : "",
    });
  };  
  
  const handleCancelEdit = () => setEditingTeacher(null);
  
  const handleUpdate = (mobileNumber) => {
    if (!editingTeacher) return;
  
    const updatedTeacher = {
      ...editingTeacher,
      dateOfBirth: formatDateToYYYYMMDD(editingTeacher.dateOfBirth),
    };
  
    axios.put(`http://localhost:3002/teachers/update/${mobileNumber}`, updatedTeacher)
      .then(() => {
        axios.get("http://localhost:3002/teachers/all") // Fetch updated list
          .then((response) => {
            setTeachers(response.data);
            setEditingTeacher(null);
          })
          .catch((error) => console.error("Error fetching teachers after update:", error));
      })
      .catch((error) => console.error("Error updating teacher:", error));
  };  
  
  const formatDateToDDMMYYYY = (isoDate) => {
    if (!isoDate) return "";
    if (isoDate.includes("/")) return isoDate;
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatDateToYYYYMMDD = (ddmmyyyy) => {
    if (!ddmmyyyy || !ddmmyyyy.includes("/")) return ddmmyyyy;
    const parts = ddmmyyyy.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}/${month}/${day}`; // Use `-` instead of `/`
    }
    return ddmmyyyy;
  };  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingTeacher({ ...editingTeacher, [name]: value });
  };

  const filteredTeachers = teachers.filter(teacher =>
    (teacher.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) &&
    (filterQualification === "" || teacher.qualification === filterQualification)
  );  
  
  return (
    <div className="teacher-container">
      <TeacherSidebar />
      <AdminLayout>
       
        <div className="search-filter-container">
          <div className="head">
            <p>List of Teachers</p>
          </div>
          <div className="top_function">
          <input type="text" placeholder="Search by Name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select value={filterQualification} onChange={(e) => setFilterQualification(e.target.value)}>
            <option value="">All Qualifications</option>
            {[...new Set(teachers.map(teacher => teacher.qualification))].map(qual => (
              <option key={qual} value={qual}>{qual}</option>
            ))}
          </select>
          </div>
          
        </div>
        <div className="teacherTable">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Address</th>
                <th>Qualification</th>
                <th>Mobile Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.mobileNumber}>
                  {editingTeacher && editingTeacher.mobileNumber === teacher.mobileNumber ? (
                    <>
                      <td><input type="text" name="fullName" value={editingTeacher.fullName} onChange={handleChange} /></td>
                      <td><input type="text" name="dateOfBirth" value={editingTeacher.dateOfBirth} onChange={handleChange} /></td>
                      <td><input type="email" name="email" value={editingTeacher.email} onChange={handleChange} /></td>
                      <td><input type="text" name="address" value={editingTeacher.address} onChange={handleChange} /></td>
                      <td><input type="text" name="qualification" value={editingTeacher.qualification} onChange={handleChange} /></td>
                      <td><input type="tel" name="mobileNumber" value={editingTeacher.mobileNumber} onChange={handleChange} /></td>
                      <td className="function">
                        <button className="btn update" onClick={() => handleUpdate(teacher.mobileNumber)}>UPDATE</button>
                        <button className="btn cancel" onClick={handleCancelEdit}>CANCEL</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{teacher.fullName}</td>
                      <td>{formatDateToDDMMYYYY(teacher.dateOfBirth)}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.address}</td>
                      <td>{teacher.qualification}</td>
                      <td>{teacher.mobileNumber}</td>
                      <td className="function">
                        <button className="btn" onClick={() => handleEdit(teacher)}>
                          <FaEye className="read" />
                        </button>
                        <button className="btn" onClick={() => handleDelete(teacher.mobileNumber)}>
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

export default TeacherList;
