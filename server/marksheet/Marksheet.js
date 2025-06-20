const mongoose = require("mongoose");

const MarksheetSchema = new mongoose.Schema({
    studentId: { type: String, required: true },
    course: { type: String, required: true },
    examinationType: { type: String, required: true },
    marks: [
        {
            subject: { type: String, required: true },
            score: { type: Number, required: true }
        }
    ],
    status: { type: String, default: "Pending" } // Status for admin verification
});

module.exports = mongoose.model("Marksheet", MarksheetSchema);

// const mongoose = require("mongoose");

// const MarksheetSchema = new mongoose.Schema({
//     studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
//     course: String,
//     examinationType: String,
//     marks: [
//         {
//             subject: String,
//             score: Number
//         }
//     ],
//     sent: { type: Boolean, default: false } // New field to track sent status
// });

// module.exports = mongoose.model("Marksheet", MarksheetSchema);
