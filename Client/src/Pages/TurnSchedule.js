import React, { useEffect, useState } from 'react';
import '../Css/table.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import AssignTurn from '../Components//AssignTurn';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { Modal, Button } from 'react-bootstrap';

export default function TurnSchedule() {

  const [busTurns, setBusTurns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("turnNo");
  const [sortColumn, setSortColumn] = useState('routeName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTurnId, setSelectedTurnId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    loadBusTurns();

  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      loadBusTurns();
    }
  }, [searchTerm]);

  const loadBusTurns = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/turn/viewTurn");
    setBusTurns(result.data);
  };

  const confirmDelete = (id) => {
    setSelectedTurnId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (selectedTurnId) {
      try {
        await axios.delete(`http://localhost:8080/api/v1/turn/deleteTurn/${selectedTurnId}`);
        setShowDeleteModal(false);
        setSelectedTurnId(null);
        loadBusTurns();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedTurnId(null);
  };

  const handleDeleteAllTurns = () => {
    if (window.confirm("Are you sure you want to delete all bus turns?")) {
      axios.delete("http://localhost:8080/api/v1/turn/deleteAllTurns");
      loadBusTurns();

    }
  }

  const handleSearchTerm = (value) => {
    setSearchTerm(value);
  };

  const handleSearchColumn = (value) => {
    setSearchColumn(value);
  };

  const performSearch = () => {
    const filteredTurns = busTurns.filter((turn) =>
      turn[searchColumn].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setBusTurns(filteredTurns);
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
  const currentItems = busTurns.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(busTurns.length / itemsPerPage);

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
          <div >
            <div className='title'>
              Bus Turn Schedule
            </div>
            <div className='datatableTitle'>
              <Link to="/addTurn" >
                <button type="button" class="btn-outline">Add</button>
              </Link>
              <div className="searchBarContainer">
                <input className="searchInput" type="text" placeholder="Search..." onChange={(e) => handleSearchTerm(e.target.value)} />
                <select className="searchColumn" onChange={(e) => handleSearchColumn(e.target.value)}>
                  <option value="turnNo">Turn No</option>
                  <option value="turnTime">Turn Time</option>
                  <option value="routeName">Route Name</option>
                </select>
                <button className="searchButton" onClick={performSearch}>Search</button>
              </div>
            </div>
            <div className="assignDeleteContainer">
              <div className="assignContainer">
                <AssignTurn />
              </div>
              <div className="deleteContainer">
                <button onClick={handleDeleteAllTurns} className='deleteTurn-btn'>Delete All Turns</button>
              </div>
            </div>

            <div className="tableBorderShadow">
              <table>

                <thead>
                  <tr>
                    <th>#</th>
                    <th scope="col" onClick={() => handleSort('turnNo')}>
                      Turn No
                      {sortColumn === 'turnNo' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'turnNo' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col" onClick={() => handleSort('turnTime')}>
                      Turn Time
                      {sortColumn === 'turnTime' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'turnTime' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col" onClick={() => handleSort('routeName')}>
                      Route Name
                      {sortColumn === 'routeName' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'routeName' && sortOrder === 'desc' && <ArrowDownward />}
                    </th>
                    <th scope="col" onClick={() => handleSort('driverID')}>
                      Driver ID
                      {sortColumn === 'driverID' && sortOrder === 'asc' && <ArrowUpward />}
                      {sortColumn === 'driverID' && sortOrder === 'desc' && <ArrowDownward />}
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
                    .map((busTurn, index) => (
                      <tr >
                        <th scope="row" key={index}>{index + 1}</th>
                        <td>{busTurn.turnNo}</td>
                        <td> {busTurn.turnTime} </td>
                        <td>{busTurn.routeName} </td>
                        <td>{busTurn.driverID}</td>
                        {/*<td>{JSON.parse(busTurn.driverID).driverID}</td> */}
                        <td>
                          <Link to={`/viewbusturn/${busTurn.id}`}>
                            <button ><RemoveRedEyeRoundedIcon className='icon'></RemoveRedEyeRoundedIcon></button>
                          </Link>
                          <Link to={`/updateTurn/${busTurn.id}`}>
                            <button ><DriveFileRenameOutlineIcon className='icon'></DriveFileRenameOutlineIcon ></button>
                          </Link>
                          <button onClick={() => confirmDelete(busTurn.id)}><DeleteForeverIcon className='icon'></DeleteForeverIcon></button>
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
          <Modal.Title>Delete Turn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this turn?
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

