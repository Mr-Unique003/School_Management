const express = require("express");
const router = express.Router();
const Student = require("../models/Students");

router.get("/:studentId", async (req, res) => {
    console.log("Fetching student profile for ID:", req.params.studentId);

    try {
        const { studentId } = req.params;
        const student = await Student.findOne({
            $or: [{ studentId: studentId }, { _id: studentId }]
        });

        if (!student) {
            console.log("Student not found in DB");
            return res.status(404).json({ message: "Student not found" });
        }

        console.log("Fetched Student Data:", student); // Debugging

        res.status(200).json(student);
    } catch (error) {
        console.error("Error fetching student profile:", error.message);
        res.status(500).json({ message: "Error fetching student profile", error: error.message });
    }
});

module.exports = router;
