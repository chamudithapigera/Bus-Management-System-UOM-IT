import React, { useEffect, useState } from 'react';
import '../Css/bus.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

export default function BusRoute() {

    const [busRoutes, setBusRoutes]=useState([]);
    useEffect(()=>{ 
      loadBusRoutes();
      
  },[]);

  const loadBusRoutes = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/busRoute/viewBusRoute");
    setBusRoutes(result.data);
  };
  
  return (
    <div className='bus'>
     <Sidebar></Sidebar>
     <div className='busContainer'>
      <Navbar></Navbar>
    <div className='container'>
        <div className='py-4'>
        <div className='title'>
            Bus Route 
          </div>
        <div className='datatableTitle'>
            
            <Link  to="/addRoute" style={{textDecoration:"none"}}>
            <AddBoxRoundedIcon className="icontop"/>
            </Link>
        </div>
        <table className="table border shadow">

  <thead>
    <tr>
      <th>#</th>
      <th scope="col">Route ID</th>
      <th scope="col">Route NO</th>
      <th scope="col">Route Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>

  <tbody>
  {busRoutes.map((busRoute,index) => (
          <tr >
          <th scope="row" key={index}>{index+1}</th>
          <td>{busRoute.routeID}</td>
          <td>{busRoute.routeNO}</td>
          <td>{busRoute.routeName}</td> 
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

