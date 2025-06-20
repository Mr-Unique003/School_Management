//This route is for adding teacher details

const express = require("express");
const Teacher = require("../models/Teachers");

const router = express.Router();

//multi add teacher
router.post("/api/upload", async (req, res) => {
  try {
    await Teacher.insertMany(req.body.data);
    res.status(200).send("Data inserted into teachers collection successfully.");
  } catch (error) {
    res.status(500).send("Error inserting data: " + error);
  }
});

// Add Teacher
router.post("/add", async (req, res) => {
    try {
      console.log("Received Data:", req.body); // Debugging
  
      const { mobileNumber } = req.body;

      // Check if a teacher with the same mobile number already exists
      const existingTeacher = await Teacher.findOne({ mobileNumber });
  
      if (existingTeacher) {
        return res.status(400).json({
          message: `Mobile Number ${mobileNumber} is already registered.`,
        });
      }
  
      const teacher = new Teacher(req.body);
      await teacher.save();
  
      res.status(201).json({ message: "Teacher added successfully!" });
  
    } catch (error) {
      console.error("Error adding teacher:", error);
      res.status(500).json({ message: "Failed to add teacher", error: error.message });
    }
  });

// Get All Teachers
router.get("/all", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    if (teachers.length === 0) {
      return res.status(404).json({ message: "No teachers found" });
    }
    res.json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res.status(500).json({ message: "Error fetching teachers", error: error.message });
  }
});

router.put("/update/:mobileNumber", async (req, res) => {
  try {
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { mobileNumber: req.params.mobileNumber }, 
      req.body, 
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: "Error updating teacher", error: error.message });
  }
});

router.delete("/delete/:mobileNumber", async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findOneAndDelete({ mobileNumber: req.params.mobileNumber });

    if (!deletedTeacher) return res.status(404).json({ message: "Teacher not found" });

    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting teacher" });
  }
});

module.exports = router;
