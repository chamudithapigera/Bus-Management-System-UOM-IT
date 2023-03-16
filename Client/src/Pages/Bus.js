import React, { useEffect, useState } from 'react';
import '../Css/bus.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';


export default function Bus() {

    const [buses, setBuses]=useState([]);
    useEffect(()=>{ 
      loadBuses();
      
  },[]);

  const loadBuses = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/bus_detail/viewBus");
    setBuses(result.data);
 };
  
  return (
    <div className='bus'>
     <Sidebar></Sidebar>
     <div className='busContainer'>
      <Navbar></Navbar>
    
    <div className='container'>
        <div className='py-4'>
        <div className='datatableTitle'>
             
            <Link  to="/addbus" style={{textDecoration:"none"}}>Add</Link>
        </div>
        <table className="table border shadow">

  <thead>
    <tr>
      <th>#</th>
      <th scope="col">Object ID</th>
      <th scope="col">Bus ID</th>
      <th scope="col">Capacity</th>
      <th scope="col">Action</th>
    </tr>
  </thead>

  <tbody>
  {buses.map((bus,index) => (
          <tr >
          <th scope="row" key={index}>{index+1}</th>
          <td>{bus.id}</td>
          <td>{bus.busID}</td>
          <td>{bus.capacity}</td> 
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
  )
}

