const mongoose = require("mongoose");

const studentNoticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: Buffer, required: true },  // If you are storing the PDF as a buffer
    contentType: { type: String, required: true } // To store the file type
}, { timestamps: true });

module.exports = mongoose.model("StudentNotice", studentNoticeSchema);
