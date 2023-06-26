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
import AddBusStop from '../Components/AddBusStop'

export default function BusStop() {

  const [BusStops, setBusStops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("busStopID");
  const [sortColumn, setSortColumn] = useState('busStopID');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBusStopId, setSelectedBusStopId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [showAddModal, setShowAddModal] = useState(false);
  
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

  const confirmDelete = (id) => {
    setSelectedBusStopId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (selectedBusStopId) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/busStop/deleteStop/${selectedBusStopId}`);
        setShowDeleteModal(false);
        setSelectedBusStopId(null);
        loadBusStops();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedBusStopId(null);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = BusStops.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(BusStops.length / itemsPerPage);

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
              Bus Stop
            </div>
            <div className='datatableTitle'>

            <button type="button" className="btn-outline" onClick={handleAdd}>
                Add
              </button>

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
                {currentItems
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

                        <Link  to={`/viewbusstop/${busStop.id}`}  >
                          <button ><RemoveRedEyeRoundedIcon className='icon'></RemoveRedEyeRoundedIcon></button>
                        </Link>

                        <Link  to={`/updateStop/${busStop.id}`}  >
                          <button ><DriveFileRenameOutlineIcon className='icon'></DriveFileRenameOutlineIcon></button>
                        </Link>

                        <button onClick={() => confirmDelete(busStop.id)}><DeleteForeverIcon className='icon'></DeleteForeverIcon></button>
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
          <Modal.Title>Delete Bus Stop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this bus stop?
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
          <Modal.Title>Add details of bus-stops</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <AddBusStop closeAddModal={() => setShowAddModal(false)} />
        </Modal.Body>
      </Modal>
    </div>
  )
}
