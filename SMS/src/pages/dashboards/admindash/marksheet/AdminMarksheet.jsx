import React, { useState, useEffect } from "react";
import AdminLayout from "../../../layout/adminlayout/AdminLayout";
import axios from "axios";
import "./AdminMarksheet.css";

const AdminMarksheet = () => {
    const [marksheets, setMarksheets] = useState([]);
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedMarksheet, setSelectedMarksheet] = useState(null);

    useEffect(() => {
        fetchMarksheetData();
        fetchStudentData();
    }, []);

    const fetchMarksheetData = async () => {
        try {
            const response = await axios.get("http://localhost:3002/marksheet/all");
            console.log("Fetched Marksheets:", response.data); // Debugging
            setMarksheets(response.data);
        } catch (error) {
            console.error("Error fetching marksheets:", error);
            setMessage("Error fetching marksheet data.");
        }
    };
    
    const fetchStudentData = async () => {
        try {
            const response = await axios.get("http://localhost:3002/students/all");
            console.log("Fetched Students:", response.data);
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
            setMessage("Error fetching student data.");
        }
    };
    
    const getStudentDetails = (studentId) => {
        if (!studentId || students.length === 0) return {}; 
        console.log("Looking for Student ID:", studentId);
        
        const student = students.find(student => student._id.toString() === studentId.toString());
        
        if (!student) {
            console.warn(`Student not found for ID: ${studentId}`);
            return {}; 
        }
        
        return student; 
    };
    
    // Show Marksheet Details on Eye Button Click
    const handleViewMarksheet = (marksheet) => {
        setSelectedMarksheet(marksheet);
    };

    // Hide Marksheet Modal
    const handleCloseModal = () => {
        setSelectedMarksheet(null);
    };

// Send Marksheet
const handleSendMarksheet = async (marksheet) => {
    try {
        const response = await axios.put("http://localhost:3002/marksheet/send-to-student", {
            studentId: marksheet.studentId,
            examinationType: marksheet.examinationType
        });

        setMarksheets((prevMarksheets) =>
            prevMarksheets.map(m =>
                m._id === marksheet._id ? { ...m, status: "Sent" } : m
            )
        );

        alert(response.data.message || "Marksheet sent successfully");
    } catch (error) {
        console.error("Error sending marksheet:", error);
        alert("Failed to send marksheet. Please try again.");
    }
};

const handleUnsendMarksheet = async (marksheet) => {
    try {
        const response = await axios.put("http://localhost:3002/marksheet/unsend-marksheet", {
            studentId: marksheet.studentId, // ✅ Ensure studentId is sent
            examinationType: marksheet.examinationType
        });

        setMarksheets((prevMarksheets) =>
            prevMarksheets.map(m =>
                m._id === marksheet._id ? { ...m, status: "Pending" } : m
            )
        );

        alert(response.data.message || "Marksheet unsent successfully");
    } catch (error) {
        console.error("Error unsending marksheet:", error);
        alert("Failed to unsend marksheet. Please try again.");
    }
};

    return (
        <AdminLayout>
            <div className="AMarksheet">
                <h2>Marksheet Records</h2>
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
                            marksheets.map((marksheet, index) => {
                                console.log("Marksheet Student ID:", marksheet.studentId); // Debugging
                                const student = getStudentDetails(marksheet.studentId);
                                console.log("Fetched Student Details:", student); // Debugging

                                return (
                                    <tr key={index}>
                                        <td>{marksheet.studentId || "N/A"}</td>
                                        <td>{student.fullName || "N/A"}</td>
                                        <td>{student.studentClass || "N/A"}</td>
                                        <td>{student.section || "N/A"}</td>
                                        <td>{student.rollNumber || "N/A"}</td>
                                        <td>{marksheet.course || "N/A"}</td>
                                        <td>{marksheet.examinationType}</td>
                                        <td>
                                            <button onClick={() => handleViewMarksheet(marksheet)}>👁️</button>
                                            {marksheet.status === "Sent" ? (
                                                <>
                                                    <button disabled style={{ background: "#4CAF50", color: "white", cursor: "default" }}>
                                                        ✅ Sent
                                                    </button>
                                                    <button onClick={() => handleUnsendMarksheet(marksheet)} style={{ background: "#FF5733", color: "white", marginLeft: "5px" }}>
                                                        Unsend
                                                    </button>
                                                </>
                                            ) : (
                                                <button onClick={() => handleSendMarksheet(marksheet)}>Send</button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="8">No marksheet data available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Overlapping Marksheet Table Modal */}
            {selectedMarksheet && (
                <div className="marksheet-modal">
                    <div className="modal-content">
                        <h3>Marksheet Details</h3>
                        <p><strong>Student ID:</strong> {selectedMarksheet.studentId}</p>
                        <p><strong>Course:</strong> {selectedMarksheet.course}</p>
                        <p><strong>Examination Type:</strong> {selectedMarksheet.examinationType}</p>

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
        </AdminLayout>
    );
};

export default AdminMarksheet;