const express = require("express");
const router = express.Router();
const Teacher = require("../models/Teachers");

router.get("/:mobileNumber", async (req, res) => {
    console.log("Fetching teacher profile for Mobile Number:", req.params.mobileNumber);

    try {
        const { mobileNumber } = req.params;
        const teacher = await Teacher.findOne({ mobileNumber: mobileNumber });

        if (!teacher) {
            console.log("Teacher not found in DB");
            return res.status(404).json({ message: "Teacher not found" });
        }

        console.log("Fetched Teacher Data:", teacher); // Debugging

        res.status(200).json(teacher);
    } catch (error) {
        console.error("Error fetching teacher profile:", error.message);
        res.status(500).json({ message: "Error fetching teacher profile", error: error.message });
    }
});

module.exports = router;
