import React, { useEffect, useState } from 'react';
import '../Css/bus.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';


export default function Driver() {

    const [Drivers, setDrivers]=useState([]);
    useEffect(()=>{ 
      loadDrivers();
      
  },[]);

  const loadDrivers = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/driver/viewDriver");
    setDrivers(result.data);
  };
  
  return (
    <div className='bus'>
     <Sidebar></Sidebar>
     <div className='busContainer'>
      <Navbar></Navbar>
    <div className='container'>
        <div className='py-4'>
        <div className='title'>
            Driver 
          </div>
        <div className='datatableTitle'>
            <Link  to="/addDriver" style={{textDecoration:"none"}}>Add Driver</Link>
        </div>
        <table className="table border shadow">

  <thead>
    <tr>
      <th>#</th>
      <th scope="col">driverID</th>
      <th scope="col">driverName</th>
      <th scope="col">licenseNo</th>
      <th scope="col">Action</th>
    </tr>
  </thead>

  <tbody>
  {Drivers.map((driver,index) => (
          <tr >
          <th scope="row" key={index}>{index+1}</th>
          <td>{driver.driverID}</td>
          <td>{driver.driverName}</td>
          <td>{driver.licenseNo}</td>
          <td>
          <Link
                        className='btn btn-warning mx-2'
                        to={`/updateDriver/${driver.id}`}
                      >
                        Edit
                      </Link>
              
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
  )
}
