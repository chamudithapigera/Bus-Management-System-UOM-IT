import React, { useEffect, useState } from 'react';
import '../Css/table.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

export default function Bus() {
  const [buses, setBuses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("busID");
  const [sortColumn, setSortColumn] = useState('busID');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadBuses();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      loadBuses();
    }
  }, [searchTerm]);

  const loadBuses = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/bus_detail/viewBus");
    setBuses(result.data);
  };

  const confirmDelete = (id) => {
    setSelectedBusId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (selectedBusId) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/bus_detail/deleteBus/${selectedBusId}`);
        setShowDeleteModal(false);
        setSelectedBusId(null);
        loadBuses();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedBusId(null);
  };

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  const handleSearchColumn = (value) => {
    setSearchColumn(value);
  };

  const performSearch = () => {
    const filteredBus = buses.filter((bus) =>
      bus[searchColumn].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBuses(filteredBus);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = buses.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(buses.length / itemsPerPage);

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
          <div>
            <div className='title'>
              Bus details
            </div>
            <div className='datatableTitle'>
              <Link to="/addbus"><button type="button" class="btn-outline">Add</button></Link>

              <div className="searchBarContainer">
                <input className="searchInput" type="text" placeholder="Search..." onChange={(e) => handleSearchTerm(e.target.value)} />
                <select className="searchColumn" onChange={(e) => handleSearchColumn(e.target.value)}>
                  <option value="busID">Bus ID</option>
                  <option value="capacity">Capacity</option>
                </select>
                <button className="searchButton" onClick={performSearch}>Search</button>
              </div>

            </div>
            <div className="tableBorderShadow">

              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th scope="col" onClick={() => handleSort('busID')}>
                      Bus ID
                      {sortColumn === 'busID' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'busID' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col" onClick={() => handleSort('capacity')}>
                      Capacity
                      {sortColumn === 'capacity' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'capacity' && sortOrder === 'desc' && <ArrowDownward />}
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
                    .map((bus, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{bus.busID}</td>
                        <td>{bus.capacity}</td>

                        <td>
                          <Link to={`/viewbus/${bus.id}`} >
                            <button ><RemoveRedEyeRoundedIcon className='icon'></RemoveRedEyeRoundedIcon></button>
                          </Link>

                          <Link to={`/updateBus/${bus.id}`}>
                            <button ><DriveFileRenameOutlineIcon className='icon'></DriveFileRenameOutlineIcon></button>
                          </Link>

                          <button onClick={() => confirmDelete(bus.id)}><DeleteForeverIcon className='icon'></DeleteForeverIcon></button>
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
          <Modal.Title>Delete Bus</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this bus?
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
  );
}
