import React, { useEffect, useState } from 'react';
import '../Css/table.scss';
import axios from "axios";
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

export default function DriverAttendance() {

  const [attendance, setAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("driverID");
  const [sortColumn, setSortColumn] = useState('driverID');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    loadAttendance();

  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      loadAttendance();
    }
  }, [searchTerm]);

  const loadAttendance = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/attendance/viewAttendance");
    setAttendance(result.data);
  };

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  const handleSearchColumn = (value) => {
    setSearchColumn(value);
  };

  const performSearch = () => {
    const filteredAttendance = attendance.filter((attendance) =>
      attendance[searchColumn].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAttendance(filteredAttendance);
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
              Driver Attendance
            </div>
            <div className='datatableTitle'>
              <div className="searchBarContainer">
                <input className="searchInput" type="text" placeholder="Search..." onChange={(e) => handleSearchTerm(e.target.value)} />
                <select className="searchColumn" onChange={(e) => handleSearchColumn(e.target.value)}>
                  <option value="driverID">Driver ID</option>
                  <option value="checkInTime">CheckIn Time</option>
                  <option value="status">Status</option>
                </select>
                <button className="searchButton" onClick={performSearch}>Search</button>
              </div>
            </div>
            <div className="tableBorderShadow">
              <table >
                <thead>
                  <tr>
                    <th>#</th>
                    <th scope="col" onClick={() => handleSort('driverID')}>
                      Driver ID
                      {sortColumn === 'driverID' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'driverID' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col" onClick={() => handleSort('date')}>
                      Date
                      {sortColumn === 'date' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'date' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col" onClick={() => handleSort('checkInTime')}>
                      CheckIn Time
                      {sortColumn === 'checkInTime' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'checkInTime' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col" onClick={() => handleSort('status')}>
                      Status
                      {sortColumn === 'status' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'status' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attendance
                    .sort((a, b) => {
                      if (sortOrder === 'asc') {
                        return a[sortColumn].localeCompare(b[sortColumn]);
                      } else {
                        return b[sortColumn].localeCompare(a[sortColumn]);
                      }
                    })
                    .map((attendance, index) => (
                      <tr >
                        <th scope="row" key={index}>{index + 1}</th>
                        <td>{attendance.driverID}</td>
                        <td>{attendance.date}</td>
                        <td>{attendance.checkInTime}</td>
                        <td>{attendance.status}</td>
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

