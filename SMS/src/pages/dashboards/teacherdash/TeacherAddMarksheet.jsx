import React, { useState } from "react";
import TeacherLayout from "../../layout/teacherlayout/TeacherLayout.jsx";
import "./TeacherAddMarksheet.css";

const subjectOptions = {
    Science: [
        { subject: "English", score: "" },
        { subject: "Physics", score: "" },
        { subject: "Chemistry", score: "" },
        { subject: "Biology", score: "" },
        { isSelectable: true, options: ["Manipuri", "Alternative-English"], score: "" },
        { isSelectable: true, options: ["Thang-ta", "Mathematics", "Home-Science","Computer-Science"], score: "" }
    ],
    Commerce: [
        { subject: "English", score: "" },
        { subject: "Accountancy", score: "" },
        { subject: "Business Studies", score: "" },
        { subject: "Economics", score: "" },
        { isSelectable: true, options: ["Manipuri", "Alternative-English"], score: "" },
        { isSelectable: true, options: ["Thang-ta", "Mathematics"], score: "" }
    ],
    Arts: [
        { subject: "English", score: "" },
        { subject: "History", score: "" },
        { subject: "Political-Science", score: "" },
        { subject: "Geography", score: "" },
        { isSelectable: true, options: ["Manipuri", "Alternative-English"], score: "" },
        { isSelectable: true, options: ["Thang-ta", "Mathematics"], score: "" }
    ]
};

const TeacherAddMarksheet = () => {
    const [course, setCourse] = useState("");
    const [examinationType, setExaminationType] = useState("Unit Test");
    const [marks, setMarks] = useState([]);
    const [studentId, setStudentId] = useState("");
    const [message, setMessage] = useState("");

    const handleCourseChange = (e) => {
        const selectedCourse = e.target.value;
        setCourse(selectedCourse);
    
        // Initialize subjects with default values for selectable ones
        const initialMarks = subjectOptions[selectedCourse]?.map((item) => {
            if (item.isSelectable) {
                return {
                    subject: item.options[0], // Default to the first option (e.g., Manipuri, Thang-ta)
                    options: item.options, // Store selectable options
                    score: "" // Empty score initially
                };
            }
            return { ...item, score: "" }; // Copy fixed subjects
        }) || [];
    
        setMarks(initialMarks);
    };
    
    // Handle subject selection change for selectable subjects
    const handleSubjectSelection = (index, e) => {
        const updatedMarks = [...marks];
        updatedMarks[index] = {
            subject: e.target.value, // Store selected subject
            options: updatedMarks[index].options, // Keep available options
            score: updatedMarks[index].score || "" // Retain score
        };
        setMarks(updatedMarks);
    };
    
    const handleMarkChange = (index, e) => {
        const updatedMarks = [...marks];
        updatedMarks[index].score = e.target.value;
        setMarks(updatedMarks);
    };
    
    const checkExistingMarksheet = async () => {
        if(!studentId || !examinationType) return

        try{
            const response = await fetch(`http://localhost:3002/marksheet/check?studentId=${studentId}&examinationType=${examinationType}`)
            const data = await response.json()

            if(response.ok && data.exists){
                setMessage("Marks already added for this student in this examination.")
                setIsDuplicate(true)
                return true
            }else {
                setIsDuplicate(false)
            }
        }catch (error){
            console.error("Error checking marksheet:", error)
        }
        return false
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!course || !studentId) {
            setMessage("Please select a course and enter student ID.");
            return;
        }
    
        const formattedMarks = marks
            .filter((item) => item.subject && item.score !== "") // Ensure selected subjects are included
            .map(({ subject, score }) => ({
                subject,
                score: Number(score),
            }));
    
        if (formattedMarks.length === 0) {
            setMessage("Please enter at least one valid subject score.");
            return;
        }
    
        const marksheetData = {
            studentId,
            course,
            examinationType,
            marks: formattedMarks,
        };
    
        try {
            const response = await fetch("http://localhost:3002/marksheet/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(marksheetData),
            });
    
            const data = await response.json();
            if (response.ok) {
                setMessage("Marksheet added successfully!");
                setMarks(subjectOptions[course] || []);

                //Refresh page after 1 sec
                setTimeout(()=>{
                    window.location.reload()
                },1000)
            } else {
                setMessage(data.error || "Failed to add marksheet");
            }
        } catch (error) {
            setMessage("Error adding marksheet");
        }
    
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    return (
        <TeacherLayout>
            <div className="AddMarksheet">
                <h2>Add Marks</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    {/* Move Student ID to the Top */}
                    <input
                        type="text"
                        placeholder="Enter student ID"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                    />

                    {/* Course Selection */}
                    <select value={course} onChange={handleCourseChange} required>
                        <option value="">Select Course</option>
                        <option value="Science">Science</option>
                        <option value="Commerce">Commerce</option>
                        <option value="Arts">Arts</option>
                    </select>

                    {/* Examination Type Selection */}
                    <select value={examinationType} onChange={(e) => setExaminationType(e.target.value)} required>
                        <option value="Unit Test">Unit Test</option>
                        <option value="Mid Term">Mid Term</option>
                        <option value="Unit Test 2">Unit Test 2</option>
                        <option value="Final">Final</option>
                    </select>

                    {/* Marks Input */}
                    {marks.map((item, index) => (
                        <div key={index}>
                            {item.options ? ( // Check if it's a selectable subject
                                <select value={item.subject} onChange={(e) => handleSubjectSelection(index, e)} required>
                                    {item.options.map((option, optIndex) => (
                                        <option key={optIndex} value={option}>{option}</option>
                                    ))}
                                </select>
                            ) : (
                                <label>{item.subject}</label> // Fixed subjects
                            )}
                            <input type="number" value={item.score} onChange={(e) => handleMarkChange(index, e)} min="0" max="100" required />
                        </div>
                    ))}

                    <button type="submit">Add Marks</button>
                </form>
            </div>
        </TeacherLayout>
    );
};

export default TeacherAddMarksheet;
