import React from 'react'
import MainLayout from '../../layout/MainLayout'
import arbin from '../../../../Images/arbindev.jpg'

import mona from '../../../../Images/mona_dev.jpg'
import robert from '../../../../Images/robert_dev.jpg'
import sebas from '../../../../Images/sebas_dev.jpg'
import marina from '../../../../Images/merina_dev.jpg'
import anjali from '../../../../Images/anjali_dev.jpg'
import jitu from '../../../../Images/sirjitu.jpeg'
import './About.css'

const developers = [
  {
    name: 'Arbinkumar Ngairangbam',
    photo: arbin,
  },
  {
    name: 'Laishram Monalisha Devi',
    photo: mona,
  },
  {
    name: 'Hidam Anjali Devi',
    photo: anjali,
  },
  
  {
    name: 'Chingkhamayum Robert',
    photo: robert,
  },
  {
    name: 'Marina Keithellakpam',
    photo: marina,
  },
  {
    name: 'Sebastiao Mussungo',
    photo: sebas,
  },
]

const About = () => {
  return (
    <div className='containerabout'>
      <MainLayout>
        <div className="about">
          <div className="intro">
            <h2>Introduction</h2>
            <p>
              Welcome to EDURA, a comprehensive School Management System designed to streamline administrative tasks,
              enhance communication, and improve the overall efficiency of educational institutions.
            </p>
            <h2>Our Mission</h2>
            <p>
              Our mission is to digitally transform educational institutions by providing an intuitive and powerful management solution.
              We aim to reduce paperwork, save time, and enable educators to focus more on student development.
            </p>
            <h2>Why Choose Us</h2>
            <ul className="why-us">
              <li><strong>User-Friendly Interface:</strong> Designed with simplicity and ease of use in mind.</li>
              <li><strong>Cloud-Based & Secure:</strong> Access the system from anywhere while ensuring data security.</li>
              <li><strong>Customizable & Scalable:</strong> Adaptable to institutions of all sizes.</li>
              <li><strong>24/7 Support:</strong> Our support team ensures smooth operation and assistance.</li>
            </ul>
          </div>

          <div className="developer">
            <h2>Meet Our Developers</h2>
            <div className="devdetails">
              {developers.map((dev, index) => (
                <div className="devcard" key={index}>
                  <img src={dev.photo} alt={dev.name} className="devphoto" />
                  <h4>{dev.name}</h4>
                  
                </div>
              ))}
              <div className="devcard">
                <img src={jitu} alt="Dr. Jitu Sapam" className="devphoto" />
                <h4>Dr. Sapam Jitu Singh</h4>
                <p>Project Mentor</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  )
}

export default About
