// const express = require("express");
// const Teacher = require("../models/Teachers");
// const router = express.Router();

// router.post("/teacher", async (req, res) => {
//   try {
//     const { mobileNumber, dateOfBirth } = req.body;

//     // Find the teacher by mobileNumber and dateOfBirth
//     const teacher = await Teacher.findOne({ mobileNumber, dateOfBirth });

//     if (!teacher) {
//       return res.status(400).send("Invalid mobile number or date of birth");
//     }

//     // Send the teacher details and mobileNumber as part of the response
//     res.status(200).json({
//       message: "Teacher login successful",
//       mobileNumber: teacher.mobileNumber,  // Include teacher ID here
//       teacherDetails: teacher,
//     });
//   } catch (error) {
//     res.status(500).send("Error logging in teacher");
//   }
// });

// module.exports = router;

const express = require("express");
const Teacher = require("../models/Teachers");
const router = express.Router();

router.post("/", async (req, res) => {  // ✅ This matches "/login/teacher" in index.js
  try {
    const { mobileNumber, dateOfBirth } = req.body;
    const teacher = await Teacher.findOne({ mobileNumber, dateOfBirth });

    if (!teacher) {
      return res.status(400).json({ message: "Invalid mobile number or date of birth" });
    }

    res.status(200).json({
      message: "Teacher login successful",
      mobileNumber: teacher.mobileNumber,
      teacherDetails: teacher,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in teacher", error: error.message });
  }
});

module.exports = router;
