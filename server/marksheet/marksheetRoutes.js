const express = require("express");
const router = express.Router();
const Marksheet = require("../marksheet/Marksheet"); // ✅ Un-comment this line
const Student = require("../models/Students");

router.post("/add", async (req, res) => {
    try {
        const { studentId, course, examinationType, marks } = req.body;

        // ✅ Check if student exists in the database
        const studentExists = await Student.findById(studentId); // Fix the lookup

        if (!studentExists) {
            return res.status(400).json({ error: "Student does not exist. Please check the Student ID." });
        }

        // ✅ Check if marks already exist for this student and examination
        const existingMarksheet = await Marksheet.findOne({ studentId, examinationType });

        if (existingMarksheet) {
            return res.status(400).json({ error: "Marks already added for this student in this examination." });
        }

        // ✅ Create new marksheet
        const newMarksheet = new Marksheet({
            studentId,
            course,
            examinationType,
            marks,
            status: "Pending"
        });

        await newMarksheet.save();
        res.status(201).json({ message: "Marksheet added successfully!" });
    } catch (error) {
        console.error("Error adding marksheet:", error);
        res.status(500).json({ error: "Failed to add marksheet" });
    }
});

router.get("/all", async (req, res) => {
    try {
        const marksheets = await Marksheet.find(); // Remove .lean() for now

        const marksheetData = await Promise.all(marksheets.map(async (marksheet) => {
            const student = await Student.findOne({ studentId: marksheet.studentId });

            return {
                _id: marksheet._id, // Ensure _id is included
                studentId: marksheet.studentId,
                fullName: student ? student.fullName : "Unknown",
                className: student ? student.className : "N/A",
                section: student ? student.section : "N/A",
                rollNumber: student ? student.rollNumber : "N/A",
                course: marksheet.course,
                examinationType: marksheet.examinationType,
                marks: marksheet.marks.map(mark => ({
                    subject: mark.subject,
                    score: mark.score,
                    _id: mark._id, // Ensure _id is included for marks as well
                })),
                status: marksheet.status
            };
        }));

        console.log("Sending Data:", JSON.stringify(marksheetData, null, 2)); // Debugging
        res.json(marksheetData);
    } catch (error) {
        console.error("Error fetching marksheets:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});

router.put("/send-to-student", async (req,res) => {
    try{
        const{studentId, examinationType} = req.body;
        
        //Find marksheet of the student for a particular exam
        const marksheet = await Marksheet.findOne({studentId, examinationType})
        
        if(!marksheet){
            return res.status(404).json({error: "Marksheet not found for this student"})
        }
        //Update status to "Sent"
        marksheet.status = "Sent";
        await marksheet.save();
        
        res.json({message: "Marksheet sent to student successfully!", marksheet})
    }catch(error){
        console.error("Error sending marksheet:",error)
        res.status(500).json({error: error.message || "Internal server error"})
    }
})

router.put("/unsend-marksheet", async (req, res) => {
    try {
        const { studentId, examinationType } = req.body;

        // Find the marksheet of the student for the given exam
        const marksheet = await Marksheet.findOne({ studentId, examinationType });

        if (!marksheet) {
            return res.status(404).json({ error: "Marksheet not found for this student." });
        }

        // Update status to "Pending"
        marksheet.status = "Pending";
        await marksheet.save();

        res.json({ message: "Marksheet unsent successfully!", marksheet });
    } catch (error) {
        console.error("Error unsending marksheet:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
});


// Fetch only "Sent" marksheets for a specific student
router.get("/student/:studentId", async(req, res) => {
    try{
        const {studentId} =req.params;

        //Fetch marksheets where status is "Sent"
        const marksheets = await Marksheet.find({studentId, status: "Sent"})

        if(marksheets.length === 0){
            return res.status(404).json({error: "No marksheets available for this student"})
        }

        res.json(marksheets)
    }catch(error){
        console.error("Error fetching student marksheets:", error);
        res.status(500).json({error: error.message || "Internal server error"})
    }
})

module.exports = router;