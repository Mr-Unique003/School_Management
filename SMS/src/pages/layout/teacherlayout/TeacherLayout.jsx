import React from 'react';
import TeacherSidebar from '../../../components/teacherside/TeacherSidebar';

const TeacherLayout = ({children}) => {
  return (
    <main className="App">
        <TeacherSidebar/>
        <div className="wrapper-landing">
            {children}
        </div>
    </main>
  )
}

export default TeacherLayout;
