import React, { useEffect, useState } from 'react';
import '../Css/table.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';


export default function Driver() {

  const [Drivers, setDrivers] = useState([]);
  useEffect(() => {
    loadDrivers();

  }, []);

  const loadDrivers = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/drivers/viewDrivers");
    setDrivers(result.data);
  };

  const deleteDriver = async (id) => {
    if (window.confirm("Are you sure you want to delete driver record?")) {
      await axios.delete(`http://localhost:8080/api/v1/drivers/deleteDriver/${id}`);
      loadDrivers();
    }
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
              <Link to="/register" >
                <button type="button" class="btn-outline">Add</button>
              </Link>
            </div>
            <div className="tableBorderShadow">
              <table >

                <thead>
                  <tr>
                    <th>#</th>
                    <th scope="col">Driver ID</th>
                    <th scope="col">Driver Name</th>
                    <th scope="col">Bus ID</th>
                    <th scope="col">Phone No</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {Drivers.map((driver, index) => (
                    <tr >
                      <th scope="row" key={index}>{index + 1}</th>
                      <td>{driver.driverId}</td>
                      <td>{driver.firstName}  {driver.lastName}</td>
                      <td>{driver.busId}</td>
                      <td>{driver.telephone}</td>
                      <td>


                        <Link className='btn btn-warning mx-2' to={`/viewdriver/${driver.id}`}>
                          <button ><RemoveRedEyeRoundedIcon className='icon'></RemoveRedEyeRoundedIcon></button>
                        </Link>

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
