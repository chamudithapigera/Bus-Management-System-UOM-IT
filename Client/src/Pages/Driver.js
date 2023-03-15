import React, { useEffect, useState } from 'react';
import '../Css/bus.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';


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
    <div className='container'>
        <div className='py-4'>
        <div className='datatableTitle'>
             <Link  to='/' style={{textDecoration:"none"}}>Home</Link>
            <Link  to="/addDriver" style={{textDecoration:"none"}}>Add Driver</Link>
        </div>
        <table className="table border shadow">

  <thead>
    <tr>
      <th>#</th>
      <th scope="col">Object ID</th>
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
          <td>{driver.id}</td>
          <td>{driver.driverID}</td>
          <td>{driver.driverName}</td>
          <td>{driver.licenseNo}</td>
          <td>
              <button className='btn btn-primary mx-2'>View</button>
              <button className='btn btn-outline mx-2'>Edit</button>
              <button className='btn btn-danger mx-2'>Delete</button>
          </td>
      </tr>
      
        ))}
   
  </tbody>
</table>
        </div>

    </div>
  )
}
