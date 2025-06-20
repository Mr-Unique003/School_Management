import React from 'react';
import StudentSidebar from '../../../components/studentside/StudentSidebar';

const StudentLayout = ({children}) => {
  return (
    <main className="App">
        <StudentSidebar/>
        <div className="wrapper-landing">
            {children}
        </div>
    </main>
  )
}

export default StudentLayout;
