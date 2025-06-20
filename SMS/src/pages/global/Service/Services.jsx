import React from 'react'
import MainLayout from '../../layout/MainLayout'
import './Service.css'
const features = [



{
  title: "Student Information Management",
  points: [
    "Centralized student profiles",
    "Attendance tracking",
    "Academic performance reports",
    "Class schedules and enrollment",
  ],
},
{
  title: "Teacher & Staff Management",
  points: [
    "Teacher profiles and qualifications",
    "Timetable and leave tracking",
    "Payroll management",
    "Role-based access",
  ],
},
{
  title: "Academic Management",
  points: [
    "Curriculum planning",
    "Subject & grade management",
    "Exam scheduling & grading",
    "Report cards & tracking",
  ],
},
{
  title: "Parent & Student Portal",
  points: [
    "Real-time access to grades and attendance",
    "Homework updates",
    "Online fee payments",
    "Announcements & notifications",
  ],
},
{
  title: "Fees & Finance Management",
  points: [
    "Automated billing",
    "Payment gateway integration",
    "Financial reporting",
    "Scholarship & discounts",
  ],
},

];

const Services = () => {
  
  return (
    <div>
        <MainLayout>
        <div className="services-container">
      <h1 className="services-title">School Management System Services</h1>
      <p className="services-subtitle">
        Simplify, streamline, and strengthen your school’s daily operations with our all-in-one School Management System.
      </p>

      <div className="services-grid">
        {features.map((feature, idx) => (
          <div className="service-card" key={idx} style={{ animationDelay: `${idx * 100}ms` }}>
            <h3 className="card-title">{feature.title}</h3>
            <ul className="card-list">
              {feature.points.map((point, i) => (
                <li key={i} className="card-item">
                  <span className="checkmark">✔</span> {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="cta-section">
        <h2>Ready to Transform Your School?</h2>
        <p>Contact us today to schedule a free demo or consultation.</p>
        <button className="cta-button">Get Started</button>
      </div>
    </div>
        </MainLayout>
    </div>
  )
}

export default Services