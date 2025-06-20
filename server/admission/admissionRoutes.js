const express = require("express");
const router = express.Router();
// const Admission = require("../models/Admission"); // Create Admission model

router.post("/", async (req, res) => {
    const { studentId } = req.body;

    try {
        const existingAdmission = await Admission.findOne({ studentId });
        if (existingAdmission) {
            return res.status(400).json({ message: "Admission already completed." });
        }

        const newAdmission = new Admission({ studentId, status: "completed" });
        await newAdmission.save();
        res.status(200).json({ message: "Admission successful!" });
    } catch (error) {
        console.error("Error in admission:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
