const express = require("express");
const router = express.Router();
const Student = require("../models/Students");

router.post("/", async (req, res) => {
  try {
    const { studentId, dateOfBirth } = req.body;

    // Find student by _id and dateOfBirth
    const student = await Student.findOne({ _id: studentId, dateOfBirth });

    if (!student) {
      return res.status(400).json({ message: "Invalid Student ID or Date of Birth" });
    }

    // Send student details upon successful login
    res.status(200).json({
      message: "Student login successful",
      studentId: student._id,
      studentDetails: student,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in student", error: error.message });
  }
});

module.exports = router;
