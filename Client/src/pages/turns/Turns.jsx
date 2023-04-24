import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./Turns.scss"

import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const Turns = () => {
  const [busTurns, setBusTurns] = useState([]);
  const { driverID } = useParams();

  useEffect(() => {
    loadBusTurns(driverID);
  }, [driverID]);

  const loadBusTurns = async (driverID) => {
    const result = await axios.get(`http://localhost:8080/api/viewTurn?driverID=${driverID}`);
    setBusTurns(result.data.filter((turn) => turn.driverID === driverID));
  };
  
  return (
    <div>
      <div className='turns'>
      <Sidebar/>
      <div className="turnsContainer">
        <Navbar/>
        
        <div className='container'>
          <div className='py-4'>
            <div className='title'>
              <h1>Bus Turn Schedule</h1>
            </div>
            <table className="table border shadow">

              <thead>
                <tr>
                  <th>#</th>
                  <th scope="col"> Turn No</th>
                  <th scope="col">Turn Time</th>
                  <th scope="col">Route Name</th>
                  <th scope="col">Driver ID</th>
                  
                </tr>
              </thead>

              <tbody>
                {busTurns.map((busTurn, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{busTurn.turnNo}</td>
                    <td> {busTurn.turnTime} </td>
                    <td>{busTurn.routeName} </td>
                    <td>{busTurn.driverID}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        </div>

        <button className='btn'>Start Route</button>
      </div>
    </div>
    </div>
  )
}

export default Turns
