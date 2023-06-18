import React, { useEffect, useState } from 'react';
import '../Css/table.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';


export default function BusRoute() {

  const [busRoutes, setBusRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("routeName");
  const [sortColumn, setSortColumn] = useState('routeID');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    loadBusRoutes();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      loadBusRoutes();
    }
  }, [searchTerm]);

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

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  const handleSearchColumn = (value) => {
    setSearchColumn(value);
  };

  const performSearch = () => {
    const filteredRoutes = busRoutes.filter((route) =>
      route[searchColumn].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBusRoutes(filteredRoutes);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
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
              Bus Route
            </div>
            <div className='datatableTitle'>

              <Link to="/addRoute" style={{ textDecoration: "none" }}>
                <button type="button" class="btn-outline">Add</button>
              </Link>

              <div className="searchBarContainer">
                <input className="searchInput" type="text" placeholder="Search..." onChange={(e) => handleSearchTerm(e.target.value)} />
                <select className="searchColumn" onChange={(e) => handleSearchColumn(e.target.value)}>
                  <option value="routeName">Route Name <ArrowUpward className="sortIcon" /></option>
                  <option value="routeID">Route ID</option>
                  <option value="routeNO">Route NO</option>
                </select>
                <button className="searchButton" onClick={performSearch}>Search</button>
              </div>

            </div>
            <div className="tableBorderShadow">

              <table >
                <thead>
                  <tr>
                    <th>#</th>
                    <th scope="col" onClick={() => handleSort('routeID')}>
                      Route ID
                      {sortColumn === 'routeID' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'routeID' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col" onClick={() => handleSort('routeNO')}>
                      Route NO
                      {sortColumn === 'routeNO' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'routeNO' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col" onClick={() => handleSort('routeName')}>
                      Route Name
                      {sortColumn === 'routeName' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'routeName' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {busRoutes
                    .sort((a, b) => {
                      if (sortOrder === 'asc') {
                        return a[sortColumn].localeCompare(b[sortColumn]);
                      } else {
                        return b[sortColumn].localeCompare(a[sortColumn]);
                      }
                    })
                    .map((busRoute, index) => (
                      <tr>
                        <th scope="row" key={index}>{index + 1}</th>
                        <td>{busRoute.routeID}</td>
                        <td>{busRoute.routeNO}</td>
                        <td>{busRoute.routeName}</td>
                        <td>
                          <Link
                            className='btn btn-warning mx-2'
                            to={`/viewbusroute/${busRoute.id}`}
                          >
                            <button><RemoveRedEyeRoundedIcon className='icon'></RemoveRedEyeRoundedIcon></button>
                          </Link>
                          <Link className='btn btn-warning mx-2' to={`/updateRoute/${busRoute.id}`} >
                            <button><DriveFileRenameOutlineIcon className='icon'></DriveFileRenameOutlineIcon></button>
                          </Link>
                          <button onClick={() => { deleteBusRoutes(busRoute.id) }}><DeleteForeverIcon className='icon'></DeleteForeverIcon></button>
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

