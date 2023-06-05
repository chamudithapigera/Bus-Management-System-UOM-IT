import React, { useEffect, useState } from 'react';
import '../Css/table.scss';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import AssignTurn from '../Components//AssignTurn';
import ResetButton from '../Components/ResetButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

export default function TurnSchedule() {

  const [busTurns, setBusTurns] = useState([]);
  useEffect(() => {
    loadBusTurns();

  }, []);

  const loadBusTurns = async () => {
    const result = await axios.get("http://localhost:8080/api/v1/turn/viewTurn");
    setBusTurns(result.data);
  };

  const deleteTurn = async (id) => {
    if (window.confirm("Are you sure you want to delete turn?")) {
      await axios.delete(`http://localhost:8080/api/v1/turn/deleteTurn/${id}`);
      loadBusTurns();
    }
  };

  

  const handleDeleteAllTurns = () => {
    if (window.confirm("Are you sure you want to delete all bus turns?")) {
       axios.delete("http://localhost:8080/api/v1/turn/deleteAllTurns");
       loadBusTurns();
      
  }

    
  }  

  return (
    <div className='bus'>
      <Sidebar></Sidebar>
      <div className='busContainer'>
        <Navbar></Navbar>
        <div className='container'>
          <div className='py-4'>
            <div className='title'>
              Bus Turn Schedule
            </div>
            <div className='datatableTitle'>

              <Link to="/addTurn" >
             <button>add</button>
              </Link>

              <AssignTurn />
            </div>
            <div className="tableBorderShadow">
            <table>

              <thead>
                <tr>
                  <th>#</th>
                  <th scope="col"> Turn No</th>
                  <th scope="col">Turn Time</th>
                  <th scope="col">Route Name</th>
                  <th scope="col">Driver ID</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {busTurns.map((busTurn, index) => (
                  <tr >
                    <th scope="row" key={index}>{index + 1}</th>
                    <td>{busTurn.turnNo}</td>
                    <td> {busTurn.turnTime} </td>
                    <td>{busTurn.routeName} </td>
                    <td>{busTurn.driverID}</td> 
                    {/*<td>{JSON.parse(busTurn.driverID).driverID}</td> */}
                    <td>

                      <Link to={`/updateTurn/${busTurn.id}`}>
                        <button ><DriveFileRenameOutlineIcon className='icon'></DriveFileRenameOutlineIcon ></button>
                      </Link>
                      <button onClick={() => deleteTurn(busTurn.id)}><DeleteForeverIcon className='icon'></DeleteForeverIcon></button>
                    </td>
                  </tr>

                ))}

              </tbody>
            </table>
</div>
            <div>
            <button onClick={handleDeleteAllTurns}>Delete All Turns</button>
        
    
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

