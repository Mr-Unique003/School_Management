import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const MainLayout = ({children}) => {
  return (
    <main className="App">
        <Navbar/>
        <div className="wrapper-landing">
            {children}
        </div>
        <Footer/>
    </main>
  )
}

export default MainLayout
