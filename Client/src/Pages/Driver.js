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
import { Modal, Button } from 'react-bootstrap';

export default function Driver() {

  const [Drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("driverId");
  const [sortColumn, setSortColumn] = useState('driverId');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadDrivers();

  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      loadDrivers();
    }
  }, [searchTerm]);

  const loadDrivers = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/drivers/viewDrivers");
    setDrivers(result.data);
  };

  const confirmDelete = (id) => {
    setSelectedDriverId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (selectedDriverId) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/drivers/deleteDriver/${selectedDriverId}`);
        setShowDeleteModal(false);
        setSelectedDriverId(null);
        loadDrivers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedDriverId(null);
  };

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };
  
  const handleSearchColumn = (value) => {
    setSearchColumn(value);
  };
  
  const performSearch = () => {
    const filteredDrivers = Drivers.filter((driver) =>
      driver[searchColumn].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDrivers(filteredDrivers);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Drivers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(Drivers.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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

              <div className="searchBarContainer">
              <input className="searchInput" type="text" placeholder="Search..." onChange={(e) => handleSearchTerm(e.target.value)} />
                <select className="searchColumn" onChange={(e) => handleSearchColumn(e.target.value)}>
                  <option value="driverId">Driver ID</option>
                  <option value="firstName">Driver Name</option>
                  <option value="busId">Bus ID</option>
                  <option value="telephone">Phone No</option>
                </select>
                <button className="searchButton" onClick={performSearch}>Search</button>
              </div>

            </div>
            <div className="tableBorderShadow">
              <table >

                <thead>
                  <tr>
                    <th>#</th>
                    <th scope="col" onClick={() => handleSort('driverId')}>
                      Driver ID
                      {sortColumn === 'driverId' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'driverId' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col" onClick={() => handleSort('firstName')}>
                      Driver Name
                      {sortColumn === 'firstName' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'firstName' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col" onClick={() => handleSort('busId')}>
                      Bus ID
                      {sortColumn === 'busId' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'busId' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col" onClick={() => handleSort('telephone')}>
                      Phone No
                      {sortColumn === 'telephone' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'telephone' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                {currentItems
                    .sort((a, b) => {
                      if (sortOrder === 'asc') {
                        return a[sortColumn].localeCompare(b[sortColumn]);
                      } else {
                        return b[sortColumn].localeCompare(a[sortColumn]);
                      }
                    })
                  .map((driver, index) => (
                    <tr >
                      <th scope="row" key={index}>{index + 1}</th>
                      <td>{driver.driverId}</td>
                      <td>{driver.firstName}  {driver.lastName}</td>
                      <td>{driver.busId}</td>
                      <td>{driver.telephone}</td>
                      <td>


                        <Link  to={`/viewdriver/${driver.id}`}>
                          <button ><RemoveRedEyeRoundedIcon className='icon'></RemoveRedEyeRoundedIcon></button>
                        </Link>

                        <Link to={`/updateDriver/${driver.id}`}>
                          <button ><DriveFileRenameOutlineIcon className='icon'></DriveFileRenameOutlineIcon ></button>
                        </Link>

                        <button onClick={() => confirmDelete(driver.id)}><DeleteForeverIcon className='icon'></DeleteForeverIcon></button>

                      </td>
                    </tr>

                  ))}

                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="pagination">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#c04255" }}>
          <Modal.Title>Delete Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this driver?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
