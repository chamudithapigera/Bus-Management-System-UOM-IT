import React, { useRef, useEffect, useState } from 'react';
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Css/viewbus.scss"
import { Link } from 'react-router-dom';


const ViewTurn = () => {

    const [turns, setTurns] = useState([]);

    useEffect(() => {
      fetch("http://localhost:8080/api/v1/turn/viewTurn")
        .then((res) => res.json())
        .then((data) => setTurns(data));
    }, []);
  
    return (
      <div className="viewbus">
        <Sidebar />
        <div className="viewbusContainer">
          <Navbar />
          <table>
      <thead>
        <tr>
          <th>Turn No</th>
          <th>Turn Time</th>
          <th>Route Name</th>
          <th>Driver ID</th>
          <th>Start Turn</th>
        </tr>
      </thead>
      <tbody>
        {turns.map((turn) => (
          <tr key={turn.id.timestamp}>
            <td>{turn.turnNo}</td>
            <td>{turn.turnTime[0]}</td>
            <td>{turn.routeName[0]}</td>
            <td>{JSON.parse(turn.driverID).driverID}</td>
            <Link to="/viewturn/savelocation" style={{textDecoration:"none"}}>
                      <td ><button>Start</button></td>
             </Link>
          </tr>
        ))}
      </tbody>
    </table>
        </div>
      </div>
    );
  };
  
  export default ViewTurn;