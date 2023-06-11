import React, { useEffect, useState } from 'react';
import '../Css/table.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';


export default function BusStop() {

  const [BusStops, setBusStops] = useState([]);
  useEffect(() => {
    loadBusStops();

  }, []);

  const loadBusStops = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/busStop/viewBusStop");
    setBusStops(result.data);
  };

  const deleteBusStops = async (id) => {
    if (window.confirm("Are you sure you want to delete this bus stop?")) {
      await axios.delete(`http://localhost:8080/api/v1/busStop/deleteStop/${id}`);
      loadBusStops();
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
              Bus Stop
            </div>
            <div className='datatableTitle'>

              <Link to="/addStop" >
                <button>Add</button>
              </Link>
            </div>
            <div className="tableBorderShadow">
              <table >

                <thead>
                  <tr>
                    <th>#</th>
                    <th scope="col">Bus Stop ID</th>
                    <th scope="col">Bus Stop Name</th>
                    {/*} <th scope="col">longitude</th>
                  <th scope="col">latitude</th>*/}
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {BusStops.map((busStop, index) => (
                    <tr >
                      <th scope="row" key={index}>{index + 1}</th>
                      <td>{busStop.busStopID}</td>
                      <td>{busStop.busStopName}</td>
                      {/*<td>{busStop.longitude}</td>
                    <td>{busStop.latitude}</td>*/}

                      <td>

                        <Link
                          className='btn btn-warning mx-2'
                          to={`/viewbusstop/${busStop.id}`}
                        >
                          <button ><RemoveRedEyeRoundedIcon className='icon'></RemoveRedEyeRoundedIcon></button>
                        </Link>

                        <Link
                          className='btn btn-warning mx-2'
                          to={`/updateStop/${busStop.id}`}
                        >
                          <button ><DriveFileRenameOutlineIcon className='icon'></DriveFileRenameOutlineIcon></button>
                        </Link>

                        <button onClick={() => deleteBusStops(busStop.id)}><DeleteForeverIcon className='icon'></DeleteForeverIcon></button>
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
