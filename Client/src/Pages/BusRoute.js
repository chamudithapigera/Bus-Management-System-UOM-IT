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
import AddBusRoute from '../Components/AddBusRoute';

export default function BusRoute() {

  const [busRoutes, setBusRoutes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("routeName");
  const [sortColumn, setSortColumn] = useState('routeID');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBusRouteId, setSelectedBusRouteId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [showAddModal, setShowAddModal] = useState(false);

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

  const confirmDelete = (id) => {
    setSelectedBusRouteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (selectedBusRouteId) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/busRoute/deleteRoute/${selectedBusRouteId}`);
        setShowDeleteModal(false);
        setSelectedBusRouteId(null);
        loadBusRoutes();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedBusRouteId(null);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = busRoutes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(busRoutes.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleAdd = () => {
    setShowAddModal(true);
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

            <button type="button" className="btn-outline" onClick={handleAdd}>
                Add
              </button>

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
                  {currentItems
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
                          <Link to={`/viewbusroute/${busRoute.id}`}   >
                            <button><RemoveRedEyeRoundedIcon className='icon'></RemoveRedEyeRoundedIcon></button>
                          </Link>
                          <Link to={`/updateRoute/${busRoute.id}`} >
                            <button><DriveFileRenameOutlineIcon className='icon'></DriveFileRenameOutlineIcon></button>
                          </Link>
                          <button onClick={() => confirmDelete(busRoute.id)}><DeleteForeverIcon className='icon'></DeleteForeverIcon></button>
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
          <Modal.Title>Delete Bus Route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this bus route?
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
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#5fb689" }}>
          <Modal.Title>Add details of bus-routes</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <AddBusRoute closeAddModal={() => setShowAddModal(false)} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

