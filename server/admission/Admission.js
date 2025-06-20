const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema({
    studentId: {type: "String", required: true, unique: true},
    status: {type: String, default: "pending"}
})

module.exports = mongoose.model("Admission", AdmissionSchema)