import React from 'react'
import './Navbar.css'
import logo from './././../../Images/main_logo.png'

import { useState, useEffect } from 'react';
import { Link, useLocation} from "react-router-dom";
const Navbar = () => {
    const location = useLocation();
  const [activeIndex, setactiveIndex] = useState(0);

  useEffect(() => {
    switch (location.pathname){
      case "/Home":
        setactiveIndex(0);
        break;
      case "/About":
        setactiveIndex(1);
        break;
      case "/Product":
        setactiveIndex(2);
        break;
      case "/Service":
        setactiveIndex(3);
        break;
      
      default:
        setactiveIndex(0);
      
    }
  })
    const handleClick = (index) => {
      setactiveIndex(index)
    }
  return (
    <div >
      <nav className='navbar'>
      
        <div className='navbar_logo'>
                <Link to='/Home'>
                  <h1>EDURA</h1>

                </Link>
        </div>
        
        <nav className='navbar_link'>
            <ul className='navbar_link-container wrap'>
              <li ><Link to ='/Home' className={({ isActive }) => (isActive ? 'active-link' : 'link')} >Home</Link></li>
              <li><Link to ='/About' className={({ isActive }) => (isActive ? 'active-link' : 'link')} >About</Link></li>
              <li><Link to ='/Service' className={({ isActive }) => (isActive ? 'active-link' : 'link')} >Services</Link></li>
              
              
            </ul>
            
            <div className="login"><Link to="/select"><button class="glow-button">Log In</button></Link></div>
        </nav>
        
       
            
          
        
    </nav>
    </div>
  )
}

export default Navbar
