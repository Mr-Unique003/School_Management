const XLSX = require("xlsx");
const Student = require("../models/Students");

const uploadExcel = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Read the Excel file
        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        // Insert students into MongoDB
        await Student.insertMany(data);

        res.status(200).json({ message: "Students uploaded successfully!" });
    } catch (error) {
        console.error("Error processing Excel file:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { uploadExcel };
