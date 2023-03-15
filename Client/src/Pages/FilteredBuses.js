import React, { useState, useEffect } from 'react';
import "../Css/filteredbus.scss"
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../Css/table.scss';

const FilteredBuses = (props) => {
  const location = useLocation();
  const { filteredBuses } = location.state;
  
    
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar/>
      
      <div className='container'>
        <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">BusID</th>
              <th scope="col">Capacity</th>
              <th>Bus Stops</th>
              <th>Bus Routes</th>
            </tr>
          </thead>
          <tbody>
          {filteredBuses.map((bus) => (
          <tr key={bus.id.timestamp}>
            <td>{bus.busID}</td>
            <td>{bus.capacity}</td>
            <td>
              <ul>
                {bus.busStopID.map((stop) => (
                  <li key={stop.s_id.timestamp}>{stop.busStopName}</li>
                ))}
              </ul>
            </td>
            <td>
              <ul>
                {bus.busRouteID.map((route) => (
                  <li key={route.r_id.timestamp}>{route.routeName}</li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
        </table>
      </div>
      </div>
      </div>
    </div>
    
  );
};

export default FilteredBuses;



