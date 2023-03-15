import React, { useEffect, useState } from 'react';
import '../Css/bus.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';


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
    <div className='container'>
        <div className='py-4'>
        <div className='datatableTitle'>
             <Link  to='/' style={{textDecoration:"none"}}>Home</Link>
            <Link  to="/addRoute" style={{textDecoration:"none"}}>Add BusRoute</Link>
        </div>
        <table className="table border shadow">

  <thead>
    <tr>
      <th>#</th>
      <th scope="col">Object ID</th>
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
          <td>{busRoute.r_id}</td>
          <td>{busRoute.routeID}</td>
          <td>{busRoute.routeNO}</td>
          <td>{busRoute.routeName}</td> 
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

