import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import "./Attendance.scss"

const Attendance = () => {
  return (
    <div className='attendance'>
      <Sidebar/>
      <div className="attendanceContainer">
        <Navbar/>
        attendance
      </div>
    </div>
  )
}

export default Attendance
