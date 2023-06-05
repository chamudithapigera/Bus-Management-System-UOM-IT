import React, { useEffect, useState } from 'react';
import '../Css/table.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

export default function Driver() {

  const [Drivers, setDrivers] = useState([]);
  useEffect(() => {
    loadDrivers();

  }, []);

  const loadDrivers = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/driver/viewDriver");
    setDrivers(result.data);
  };

  const deleteDriver = async (id) => {
    if (window.confirm("Are you sure you want to delete driver record?")) {
    await axios.delete(`http://localhost:8080/api/v1/driver/deleteDriver/${id}`);
    loadDrivers();}
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
              <Link to="/addDriver" >
              <button>Add</button>
              </Link>
            </div>
            <div className="tableBorderShadow">
            <table >

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
                {Drivers.map((driver, index) => (
                  <tr >
                    <th scope="row" key={index}>{index + 1}</th>
                    <td>{driver.driverID}</td>
                    <td>{driver.driverName}</td>
                    <td>{driver.licenseNo}</td>
                    <td>

                      <Link to={`/updateDriver/${driver.id}`}>
                        <button ><DriveFileRenameOutlineIcon className='icon'></DriveFileRenameOutlineIcon ></button>
                      </Link>

                      <button onClick={() => deleteDriver(driver.id)}><DeleteForeverIcon className='icon'></DeleteForeverIcon></button>
                      
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
