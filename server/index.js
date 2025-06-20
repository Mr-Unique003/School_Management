const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const adminLoginRoute = require("./login/admin");
const studentLoginRoute = require("./login/student");
const teacherLoginRoute = require("./login/teacher");

const notificationRoute = require("./notice/noticeRoutes");
const marksheetRoutes = require("./marksheet/marksheetRoutes");
const studentRoutes = require("./routes/studentRoutes"); // Import Student Routes
const teacherRoutes = require("./routes/teacherRoutes"); // Import Teacher Routes
const studentProfileRoute = require("./Profile/studentprofile"); // Import student profile route
const teacherProfileRoute = require("./Profile/teacherprofile"); // Import teacher profile route
const admissionRoutes = require("./admission/admissionRoutes")

mongoose.connect("mongodb+srv://admin:2ybG21ZqDNDZcjmp@cluster0.xpzpk.mongodb.net/School_management_system");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/login/admin", adminLoginRoute);
app.use("/login/student", studentLoginRoute);
app.use("/login/teacher", teacherLoginRoute);
app.use("/notice", notificationRoute);
app.use("/marksheet", marksheetRoutes);
app.use("/students", studentRoutes); // Use Student Routes for adding student details
app.use("/teachers", teacherRoutes); // Use Teacher Routes for adding teacher details
app.use("/StudentProfile", studentProfileRoute)
app.use("/TeacherProfile", teacherProfileRoute)
app.use("/admission", admissionRoutes)

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
