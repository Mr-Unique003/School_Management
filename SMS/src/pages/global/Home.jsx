import React from 'react'
import './home.css'
import mockup_laptop from '../../../Images/laptop-realistic.png'
import MainLayout from '../layout/MainLayout'
import { Link } from 'react-router-dom'
import FeatureSlider from './FeatureSlider'

const Home = () => {
  return (
    <div className='containerlp'>
        <MainLayout>
        <div className="hero-section">
  <div className="hero-content">
    <div className="hero-text">
      <h1>All-in-One School Management</h1>
      <p>Free forever for schools — manage attendance, results, reports & more!</p>
      <Link to="/select"><button className='herobtn'>Get Started</button></Link>
    </div>
    <div className="mockup">
      <img src="../../../Images/laptop-realistic.png" alt="Laptop Dashboard" />
    </div>
  </div>
</div>


        
        <div className="features">
          <FeatureSlider/>
          
        </div>
        <div className="benifits">
          <h1>Benifits</h1>
          <div className="bp1">
          <div className="b1">
          📚 Efficient Administration – Automate attendance, grades, and reports, saving time for teachers and staff.
          </div>
          <div className="b1">
          💳 Online Fee Management – Simplify payments with automated invoices, reminders, and online transactions.
          </div>
          <div className="b1">
          📊 Data-Driven Insights – Generate real-time reports to track student performance and attendance.
          </div>
          </div>
          <div className="bp1">
          <div className="b1">
          🔒 Secure & Cloud-Based – Access school data anytime, anywhere with robust security measures.
          </div>
          <div className="b1">
          🎯 Easy Scheduling – Manage timetables, assignments, and events in one platform.
          </div>
          <div className="b1">
          👩‍🏫 Better Communication – Seamless interaction between parents, teachers, and students via a secure portal.
          </div>
          </div>

        </div>
        </MainLayout>
      
    </div>
  )
}

export default Home
