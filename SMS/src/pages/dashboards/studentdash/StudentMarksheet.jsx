import React, { useState, useEffect } from "react";
import StudentLayout from "../../layout/studentlayout/StudentLayout";
import axios from "axios";
import "./StudentMarksheet.css";

const StudentMarksheet = () => {
    const [marksheets, setMarksheets] = useState([]);
    const [studentDetails, setStudentDetails] = useState(null);
    const [selectedMarksheet, setSelectedMarksheet] = useState(null);
    const [message, setMessage] = useState("");

    const loggedInStudentId = localStorage.getItem("studentId");

    useEffect(() => {
        fetchMarksheetData();
        fetchStudentDetails();
    }, []);

    // ✅ Fetch student's marksheets
    const fetchMarksheetData = async () => {
        try {
            const response = await axios.get(`http://localhost:3002/marksheet/student/${loggedInStudentId}`);
            console.log("Fetched Marksheets:", response.data);
            setMarksheets(response.data);
            if (response.data.length === 0) setMessage("No marksheet available.");
        } catch (error) {
            console.error("Error fetching marksheets:", error);
            setMessage("Error fetching marksheets.");
        }
    };

    // ✅ Fetch student details properly
    const fetchStudentDetails = () => {
        const storedStudent = JSON.parse(localStorage.getItem("student"));
        if (storedStudent) {
            console.log("Stored Student Details:", storedStudent); // Debugging
            setStudentDetails(storedStudent);
        } else {
            console.warn("Student details not found in localStorage.");
            setMessage("Student details not found.");
        }
    };

    // ✅ Show Marksheet Details Modal
    const handleViewMarksheet = (marksheet) => {
        setSelectedMarksheet(marksheet);
    };

    // ✅ Close Marksheet Modal
    const handleCloseModal = () => {
        setSelectedMarksheet(null);
    };

    return (
        <StudentLayout>
            <div className="SMarksheet">
                <h2>My Marksheet</h2>
                {message && <p className="message">{message}</p>}

                <table>
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Full Name</th>
                            <th>Class</th>
                            <th>Section</th>
                            <th>Roll Number</th>
                            <th>Course</th>
                            <th>Examination Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {marksheets.length > 0 ? (
                            marksheets.map((marksheet, index) => (
                                <tr key={index}>
                                    <td>{studentDetails?._id || "N/A"}</td> {/* ✅ Fixed Student ID */}
                                    <td>{studentDetails?.fullName || "N/A"}</td>
                                    <td>{studentDetails?.studentClass || "N/A"}</td> {/* ✅ Fixed Class */}
                                    <td>{studentDetails?.section || "N/A"}</td>
                                    <td>{studentDetails?.rollNumber || "N/A"}</td>
                                    <td>{marksheet.course || "N/A"}</td>
                                    <td>{marksheet.examinationType}</td>
                                    <td>
                                        <button onClick={() => handleViewMarksheet(marksheet)}>👁️</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No marksheet data available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Overlapping Marksheet Table Modal (ONLY MARKS) */}
            {selectedMarksheet && (
                <div className="marksheet-modal">
                    <div className="modal-content">
                        <h3>Marks Details</h3>

                        <table>
                            <thead>
                                <tr>
                                    <th>Subjects</th>
                                    <th>Marks</th>
                                    <th>Full Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedMarksheet.marks.map((mark, i) => (
                                    <tr key={i}>
                                        <td>{mark.subject}</td>
                                        <td>{mark.score}</td>
                                        <td>100</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <button onClick={handleCloseModal}>Close</button>
                    </div>
                </div>
            )}
        </StudentLayout>
    );
};

export default StudentMarksheet;
