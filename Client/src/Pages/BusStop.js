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

export default function BusStop() {

  const [BusStops, setBusStops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("busStopID");
  const [sortColumn, setSortColumn] = useState('busStopID');
  const [sortOrder, setSortOrder] = useState('asc');


  useEffect(() => {
    loadBusStops();

  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      loadBusStops();
    }
  }, [searchTerm]);

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

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  const handleSearchColumn = (value) => {
    setSearchColumn(value);
  };

  const performSearch = () => {
    const filteredStops = BusStops.filter((stop) =>
      stop[searchColumn].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBusStops(filteredStops);
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
              Bus Stop
            </div>
            <div className='datatableTitle'>

              <Link to="/addStop" >
                <button type="button" class="btn-outline">Add</button>
              </Link>

              <div className="searchBarContainer">
                <input className="searchInput" type="text" placeholder="Search..." onChange={(e) => handleSearchTerm(e.target.value)} />
                <select className="searchColumn" onChange={(e) => handleSearchColumn(e.target.value)}>
                  <option value="busStopID">Bus Stop ID</option>
                  <option value="busStopName">Bus Stop Name</option>
                </select>
                <button className="searchButton" onClick={performSearch}>Search</button>
              </div>

            </div>
            <div className="tableBorderShadow">
              <table >

                <thead>
                  <tr>
                    <th>#</th>
                    <th scope="col" onClick={() => handleSort('busStopID')}>
                      Bus Stop ID
                      {sortColumn === 'busStopID' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'busStopID' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col" onClick={() => handleSort('busStopName')}>
                      Bus Stop Name
                      {sortColumn === 'busStopName' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'busStopName' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                {BusStops
                    .sort((a, b) => {
                      if (sortOrder === 'asc') {
                        return a[sortColumn].localeCompare(b[sortColumn]);
                      } else {
                        return b[sortColumn].localeCompare(a[sortColumn]);
                      }
                    })
                  .map((busStop, index) => (
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
