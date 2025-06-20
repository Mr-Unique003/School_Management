import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from './pages/global/Home.jsx';
import Select from './pages/userselect/Select.jsx';
import AdminSignin from './pages/userselect/adminsignin/AdminSignin.jsx';
import AdminDash from './pages/dashboards/admindash/AdminDash.jsx';
import StudentDash from './pages/dashboards/studentdash/StudentDash.jsx';
import TeacherDash from './pages/dashboards/teacherdash/TeacherDash.jsx';
import StudentList from './pages/dashboards/admindash/studentdetail/StudentList.jsx';
import TeacherList from './pages/dashboards/admindash/teacherdetail/TeacherList.jsx';
import AddStudent from './pages/dashboards/admindash/studentdetail/AddStudent.jsx';
import AddTeacher from './pages/dashboards/admindash/teacherdetail/AddTeacher.jsx';
import TeacherSignin from './pages/userselect/adminsignin/TeacherSignin.jsx';
import StudentSignin from './pages/userselect/adminsignin/StudentSignin.jsx';
import StudentProfile from './pages/dashboards/studentdash/StudentProfile.jsx';
import TeacherProfile from './pages/dashboards/teacherdash/TeacherProfile.jsx';
import StudentAttendance from './pages/dashboards/studentdash/StudentAttendance.jsx';
import StudentMarksheet from './pages/dashboards/studentdash/StudentMarksheet.jsx';
import AdminNotice from './pages/dashboards/admindash/AdminNotice.jsx';
import StudentNotice from './pages/dashboards/studentdash/StudentNotice.jsx';
import TeacherNotice from './pages/dashboards/teacherdash/TeacherNotice.jsx'
import AdminStudentNotice from './pages/dashboards/admindash/notice/AdminStudentNotice.jsx';
import AdminTeacherNotice from './pages/dashboards/admindash/notice/AdminTeacherNotice.jsx';
import AdminPublicNotice from './pages/dashboards/admindash/notice/AdminPublicNotice.jsx';
import TeacherAddMarksheet from './pages/dashboards/teacherdash/TeacherAddMarksheet.jsx';
import AdminMarksheet from './pages/dashboards/admindash/marksheet/AdminMarksheet.jsx';
import StudentAdmission from './pages/dashboards/studentdash/StudentAdmission.jsx';
import About from './pages/global/About/About.jsx';
import Services from './pages/global/Service/Services.jsx';
import Multi_add from './pages/dashboards/admindash/teacherdetail/Multi_add_teacher.jsx';
import Multi_add_students from './pages/dashboards/admindash/studentdetail/Multi_add_students.jsx';

//import { Home } from './pages/index.js';
const router = createBrowserRouter([

  {
    path:"/",
    element:<App/>
  },
  {
    path:"Home",
    element:<Home/>
  },
  {
    path:"About",
    element:<About/>
  },
  {
    path:"Service",
    element:<Services/>
  },
  {
    path:"/Select",
    element:<Select/>
  },
  {
    path:"/AdminRegister",
    element:<AdminSignin/>
  },
  {
    path:"/StudentRegister",
    element:<StudentSignin/>
  },
  {
    path:"/TeacherRegister",
    element:<TeacherSignin/>
  },
  {
    path:"/AdminDashboard",
    element:<AdminDash/>
  },
  {
    path:"/Admin/StudentDetail",
    element:<StudentList/>
  },
  {
    path:"/Admin/AddStudent",
    element:<AddStudent/>
  },

  {
    path:"/Admin/TeacherDetail",
    element:<TeacherList/>
  },
  {
    path:"/Admin/AddTeacher",
    element:<AddTeacher/>
  },

  {
    path:"/StudentDashboard",
    element:<StudentDash/>
  },
   {
     path:"/StudentProfile",
     element:<StudentProfile/>
  },
  {
    path:"/AttendanceStudent",
    element:<StudentAttendance/>
 },
  
  {
    path:"/TeacherProfile",
    element:<TeacherProfile/>
  },
  {
    path:"/TeacherDashboard",
    element:<TeacherDash/>
  },{
    path: "/AddNotice",
    element:<AdminNotice/>
  },{
    path:"/Student/Notice",
    element:<StudentNotice/>
  }
  ,{
    path:"/Teacher/Notice",
    element:<TeacherNotice/>
  },{
    path:"/AdminStudentNotice",
    element:<AdminStudentNotice/>
  },{
    path:"/AdminTeacherNotice",
    element:<AdminTeacherNotice/>
  },{
    path:"/AdminPublicNotice",
    element:<AdminPublicNotice/>
  },{
    path:"TeacherAddMArksheet",
    element:<TeacherAddMarksheet/>
  },{
    path:"AdminMarksheet",
    element:<AdminMarksheet/>
  },{
    path:"StudentMarksheet",
    element:<StudentMarksheet/>
  },{
    path:"StudentAdmission",
    element:<StudentAdmission/>
  },
  {
    path:"Teacher/MultiAdd",
    element:<Multi_add/>
  },
  {
    path:"Student/MultiAdd",
    element:<Multi_add_students/>
  }

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
