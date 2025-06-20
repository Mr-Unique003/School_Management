const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  _id: { type: String, required: false },  // 👈 Allow string as _id
  fullName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  studentClass: { type: String, required: true },
  section: { type: String, required: true },
  rollNumber: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true }
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
