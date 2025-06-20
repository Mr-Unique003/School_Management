import React from 'react'
import { Link } from 'react-router-dom'
import './Select.css'
import MainLayout from '../layout/MainLayout'
const Select = () => {
  return (
       <MainLayout>
         <div className='userselect_wrapper'>
         <div className="floating-shapes">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
      <div className="select_wrapper">
      
    <h1>Welcome</h1>
    <p>Select your portal</p>
       
        <div className="select_bttn">
          
        <Link to="/StudentRegister"><button>Student</button></Link>
        </div>
        <div className="select_bttn">
        <Link to="/TeacherRegister"><button>Teacher</button></Link>
        </div>
        
      </div>
      
    </div>
       </MainLayout>
  )
}

export default Select
