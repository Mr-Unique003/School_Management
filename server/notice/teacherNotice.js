// const mongoose = require("mongoose");

// const teacherNoticeSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   filePath: { type: String, required: false },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("TeacherNotice", teacherNoticeSchema);

const mongoose = require("mongoose");

const TeacherNoticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: Buffer, required: true },
    contentType: { type: String, required: true },
}, { timestamps: true }); // ✅ This ensures createdAt is included

const TeacherNotice = mongoose.model("TeacherNotice", TeacherNoticeSchema);
module.exports = TeacherNotice;
