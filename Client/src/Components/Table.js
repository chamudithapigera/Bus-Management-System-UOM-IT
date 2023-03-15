import React, { useState , useEffect} from 'react';
import api from './api';
import { Marker, Popup } from 'react-leaflet';
import { Tab } from 'react-bootstrap';
import axios from 'axios';
import '../Css/table.scss'

const Table = () => {
  
  const [buses, setBuses] = useState([]);
  
  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async ()=>{

    const result = await axios.get("http://localhost:8080/api/v1/buses/viewBus");
    console.log(result.data);
    setBuses(result.data);
  }

  return (
    <div className="container">
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
          {buses.map((bus) => (
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
  );
}

  

export default Table;