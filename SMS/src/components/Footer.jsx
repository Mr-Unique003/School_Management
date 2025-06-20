import React from 'react'
import './foot.css';
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div>
        <footer className="footer">
      <div className="footer-container">
        
        {/* About Section */}
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Empowering schools with digital transformation for seamless management.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/About">About</Link></li>
            <li><Link to="/Service">Services</Link></li>

            
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: info@yourwebsite.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 School St, City, Country</p>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        &copy; 2025 EDURA. All Rights Reserved.
      </div>
    </footer>
    </div>
  )
}

export default Footer