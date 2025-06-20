import React from 'react'
import AdminSidebar from '../../../components/adminside/AdminSidebar'


const AdminLayout = ({children}) => {
  return (
    <main className="App">
        <AdminSidebar/>
        <div className="wrapper-landing">
            {children}
        </div>
    </main>
  )
}

export default AdminLayout
