import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from 'axios';
import "./Home.scss";

function Home() {
  const [turns, setTurns] = useState([]);

  useEffect(() => {
    const fetchTurns = async () => {
      const turnIds = [1, 2, 3];
      const turnData = [];
    
      for (const id of turnIds) {
        const start = await axios.get(`http://localhost:8080/api/turns/${id}/startpoint`);
        const end = await axios.get(`http://localhost:8080/api/turns/${id}/endpoint`);
        turnData.push({ id, start: start.data.startPoint, end: end.data.endPoint });
      }
    
      setTurns(turnData);
    };
    

    fetchTurns();
  }, []);

  return (
    <div className='home'>
      <div className="sidebar">
        <Sidebar/>
      </div>
      <div className="homeContainer">
        <div className="navbar">
          <Navbar/>
        </div>
        <div className="dashboard-container">
          <div className="dashboard">
            <div className="widget">
              <h2>Driver Statistics</h2>
              <p>Total Trips: 50</p>
              <p>Completed Trips: 40</p>
              <p>Pending Trips: 10</p>
            </div>
          </div>

          <div className="dashboard">
            <div className="widget">
              <h2>Bus Information</h2>
              <p>Bus Name: ABC123</p>
              <p>Bus Route: Route A</p>
              <p>Bus Capacity: 50</p>
            </div>
          </div>

          <div className="dashboard">
            <div className="widget">
              <h2>Notifications</h2>
              <p>No new notifications</p>
            </div>
          </div>

          <div className="dashboard">
            <div className="widget">
              <h2>Turn Start and End Points</h2>
              <table>
                <thead>
                  <tr>
                    <th>Turn ID</th>
                    <th>Start Point</th>
                    <th>End Point</th>
                  </tr>
                </thead>
                <tbody>
                  {turns.map(turn => (
                    <tr key={turn.id}>
                      <td>{turn.id}</td>
                      <td>{turn.start}</td>
                      <td>{turn.end}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
