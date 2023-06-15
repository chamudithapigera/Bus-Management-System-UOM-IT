import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios';
import "./Turns.scss"
import { DriverContext } from '../driver/DriverContext';
import ErrorBoundary from '../../components/error/ErrorBoundary';
import Map from '../../components/map/Map';
import { Link } from 'react-router-dom';

const Turns = () => {
  const { driverId } = useContext(DriverContext); 
  console.log("Driver ID: ", driverId); 

  const [turns, setTurns] = useState([
    { id: 1, startTime: "9:00 AM", endTime: "12:00 PM", startPoint: "", endPoint: "" },
    { id: 2, startTime: "2:00 PM", endTime: "5:00 PM", startPoint: "", endPoint: "" },
    { id: 3, startTime: "7:00 PM", endTime: "10:00 PM", startPoint: "", endPoint: "" }
  ]);

  useEffect(() => {
    const fetchTurns = async () => {
      for (let i = 0; i < turns.length; i++) {
        const turnId = turns[i].id;
        const start = await axios.get(`http://localhost:8080/api/turns/${turnId}/startpoint`);
        const end = await axios.get(`http://localhost:8080/api/turns/${turnId}/endpoint`);
        turns[i].startPoint = start.data.startPoint;
        turns[i].endPoint = end.data.endPoint;
      }

      setTurns([...turns]);
    };

    fetchTurns();
  }, []);

  const handleStartChange = (e, turnId) => {
    const newTurns = turns.map(turn => turn.id === turnId ? { ...turn, startPoint: e.target.value } : turn);
    setTurns(newTurns);
  };

  const handleEndChange = (e, turnId) => {
    const newTurns = turns.map(turn => turn.id === turnId ? { ...turn, endPoint: e.target.value } : turn);
    setTurns(newTurns);
  };

  const handleSubmit = async (e, turnId) => {
    e.preventDefault();

    // find the turn with the given ID
    const turn = turns.find(turn => turn.id === turnId);

    // update start and end points in the database
    await axios.patch(`http://localhost:8080/api/turns/${turnId}/startpoint`, {startPoint: turn.startPoint});
    await axios.patch(`http://localhost:8080/api/turns/${turnId}/endpoint`, {endPoint: turn.endPoint});
    window.alert("Successfully updated!");
  };

  return (
    <div className='turns'>
      <Sidebar />
      <div className="turnsContainer">
        <Navbar />
        <div className="driver-turns">
          <h1 className="page-title">My Turns</h1>
          <div className="turns-list">
            {turns.map(turn => (
              <div className="turn" key={turn.id}>
                <h2 className="turn-title">Turn {turn.id}</h2>
                <p className="turn-info">Start Time: {turn.startTime}</p>
                <p className="turn-info">End Time: {turn.endTime}</p>
                <form onSubmit={(e) => handleSubmit(e, turn.id)}>
                  <label>
                    Start point:
                    <input type="text" value={turn.startPoint} onChange={(e) => handleStartChange(e, turn.id)} />
                  </label>
                  <label>
                    End point:
                    <input type="text" value={turn.endPoint} onChange={(e) => handleEndChange(e, turn.id)} />
                  </label>
                  <button type="submit">Save</button>
                </form>
                <p>Start point: {turn.startPoint}</p>
                <p>End point: {turn.endPoint}</p>
                <Link to={{ pathname: "/map", state: { start: turn.startPoint, end: turn.endPoint } }}>
                  <div className="viewButton">Start</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Turns
