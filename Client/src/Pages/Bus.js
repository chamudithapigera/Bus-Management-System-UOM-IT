import React, { useEffect, useState } from 'react';
import '../Css/table.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';

export default function Bus() {

  const [buses, setBuses] = useState([]);
  

  useEffect(() => {
    loadBuses();

  }, []);

  const loadBuses = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/bus_detail/viewBus");
    setBuses(result.data);
  };

  const deleteBus = async (id) => {
    if (window.confirm("Are you sure you want to delete this bus ?")) {
    await axios.delete(`http://localhost:8080/api/v1/bus_detail/deleteBus/${id}`);
    loadBuses();}
  };
  

  return (
    <div className='bus'>
      <Sidebar></Sidebar>
      <div className='busContainer'>
        <Navbar></Navbar>

        <div className='container'>
          <div className='py-4'>
            <div className='title'>
              Bus details
            </div>
            <div className='datatableTitle'>

              <Link to="/addbus" ><button>Add</button></Link>
            </div>
            <div className="tableBorderShadow">
            <table >
              <thead>
                <tr>
                  <th>#</th>
                  <th scope="col">Bus ID</th>
                  <th scope="col">Capacity</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>


              <tbody>
                {buses.map((bus, index) => (
                  <tr >
                    <th scope="row" key={index}>{index + 1}</th>
                    <td>{bus.busID}</td>
                    <td>{bus.capacity}</td>

                    <td>
                    <Link
                        className='btn btn-warning mx-2'
                        to={`/viewbus/${bus.id}`}
                      >
                    <button ><RemoveRedEyeRoundedIcon className='icon'></RemoveRedEyeRoundedIcon></button>
                    </Link>

                      <Link
                        className='btn btn-warning mx-2'
                        to={`/updateBus/${bus.id}`}
                      >
                        <button ><DriveFileRenameOutlineIcon className='icon'></DriveFileRenameOutlineIcon></button>
                      </Link>
                      <button onClick={() => deleteBus(bus.id)}><DeleteForeverIcon className='icon'></DeleteForeverIcon></button>
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
