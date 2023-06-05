import React, { useEffect, useState } from 'react';
import '../Css/table.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

export default function DriverAttendance() {

    const [attendance, setAttendance]=useState([]);
    useEffect(()=>{ 
      loadAttendance();
      
  },[]);

  const loadAttendance = async () => {
    const result = await axios.get("http://localhost:8080/attendance/viewAttendance");
    setAttendance(result.data);
  };
  
  return (
    <div className='bus'>
     <Sidebar></Sidebar>
     <div className='busContainer'>
      <Navbar></Navbar>
    <div className='container'>
        <div className='py-4'>
        <div className='title'>
            Driver Attendance
          </div>
          <div className="tableBorderShadow">
        <table >

  <thead>
    <tr>
      <th>#</th>
      <th scope="col">Driver ID</th>
      <th scope="col">Date</th>
      <th scope="col">CheckIn Time</th>
      <th scope="col"> Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>

  <tbody>
  {attendance.map((attendance,index) => (
          <tr >
          <th scope="row" key={index}>{index+1}</th>
          <td>{attendance.driverID}</td>
          <td>{attendance.date}</td>
          <td>{attendance.checkInTime}</td> 
          <td>{attendance.status}</td> 
          <td>
              <button className='btn btn-outline mx-2'>Edit</button>
              <button className='btn btn-danger mx-2'>Delete</button>
          </td>
      </tr>
      
        ))}
   
  </tbody>
</table>
</div>
        </div>
        </div>
    </div>
    </div>
  )
}

