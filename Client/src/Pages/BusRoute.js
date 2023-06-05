import React, { useEffect, useState } from 'react';
import '../Css/table.scss';
import axios from "axios";
import { Link, useParams,useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

export default function BusRoute() {

  const [busRoutes, setBusRoutes] = useState([]);
  
  let navigate = useNavigate()
  

  const { id } = useParams()

  useEffect(() => {
    loadBusRoutes();
  }, []);

  

 
  const loadBusRoutes = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/busRoute/viewBusRoute");
    setBusRoutes(result.data);
  };

  const deleteBusRoutes = async (id) => {
    if (window.confirm("Are you sure you want to delete this bus route?")) {
        await axios.delete(`http://localhost:8080/api/v1/busRoute/deleteRoute/${id}`);
        loadBusRoutes();
       
    }
};

  
{/*
  const deleteBusRoutes = async (id) => {
    
    await axios.delete(`http://localhost:8080/api/v1/busRoute/deleteRoute/${id}`); 
    await axios.delete(`http://localhost:8080/api/v1/bus_detail/busRoute/${id}`);
    loadBusRoutes();
    loadBus();
  };

*/}


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

              <Link to="/addRoute" style={{ textDecoration: "none" }}>
              <button>Add</button>
              </Link>
            </div>
            <div className="tableBorderShadow">
            <table >

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
                {busRoutes.map((busRoute, index) => (
                  <tr >
                    <th scope="row" key={index}>{index + 1}</th>
                    <td>{busRoute.routeID}</td>
                    <td>{busRoute.routeNO}</td>
                    <td>{busRoute.routeName}</td>
                    <td>

                      <Link
                        className='btn btn-warning mx-2'
                        to={`/updateRoute/${busRoute.id}`}
                      >
                        <button ><DriveFileRenameOutlineIcon className='icon'></DriveFileRenameOutlineIcon></button>
                      </Link>

                    <button  onClick={() => {deleteBusRoutes(busRoute.id)}}><DeleteForeverIcon className='icon'></DeleteForeverIcon></button>
                    

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

