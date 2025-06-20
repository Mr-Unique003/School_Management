const mongoose =require('mongoose')
const teacherSchema = new mongoose.Schema({

fullName:String,
dateOfBirth:String,
email:String,
address:String,
qualification:String,
mobileNumber:String

})
const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher
