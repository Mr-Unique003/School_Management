//This route is for adding student details
const express = require("express");
const Student = require("../models/Students");
const multer = require("multer");
const { uploadExcel } = require("../routes/studentController")
const router = express.Router();


//student multi add
router.post("/api/stud/upload", async (req, res) => {
  try {
    await Student.insertMany(req.body.data);
    res.status(200).send("Data inserted into students collection successfully.");
  } catch (error) {
    res.status(500).send("Error inserting data: " + error);
  }
});


// Add Student (Ensure unique _id)
router.post("/add", async (req, res) => {
  try {
      const { section, rollNumber } = req.body;
      console.log("Received Data:", req.body);

      // Check if rollNumber already exists in the section
      const existingStudent = await Student.findOne({ section, rollNumber });

      if (existingStudent) {
          return res.status(400).json({
              message: `Roll Number ${rollNumber} is already taken in Section ${section}.`
          });
      }

      // Add student since roll number is unique within the section
      const student = new Student(req.body);
      await student.save();
      
      res.status(201).json({ message: "Student added successfully!" });

  } catch (error) {
      console.error("Error adding student:", error); // <-- LOG ERROR TO DEBUG

      if (error.code === 11000) {
          return res.status(400).json({
              message: "Student Id already exists."
          });
      }

      res.status(500).json({ message: "Failed to add student", error: error.message });
  }
});

router.get("/all", async (req, res) => {
    try {
      const students = await Student.find();
      if (students.length === 0) {
        return res.status(404).json({ message: "No students found" });
      }
      res.json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ message: "Error fetching students", error: error.message });
    }
  });
  //total student
  
// Update Student details by ID
router.put("/updateStudent/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Error updating student" });
  }
});

// Delete Student by ID     
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting student" });
  }
});

router.get("/check/:studentId", async (req, res) => {
  try {
      const { studentId } = req.params;

      // Ensure studentId is a string (if stored differently in MongoDB)
      const student = await Student.findOne({ studentId: studentId });

      if (student) {
          return res.json({ exists: true });
      } else {
          return res.status(404).json({ exists: false, message: "Student not found" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error checking student" });
  }
});

module.exports = router;
