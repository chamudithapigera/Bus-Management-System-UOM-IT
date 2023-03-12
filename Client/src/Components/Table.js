import React, { useState } from 'react';
import api from './api';
import { Marker, Popup } from 'react-leaflet';

function BusHaltMarker({ haltName ,position,icon}) {
  const [filteredBuses, setFilteredBuses] = useState([]);

  const handleClick = () => {
    api.get(`/getBusbyHaltName/${haltName}`).then(res => {
      setFilteredBuses(res.data);
    });
  };

  return (
    <Marker position={position} icon={icon} onClick={handleClick}>
      <Popup>
        <h3>{haltName}</h3>
        <table>
          <thead>
            <tr>
              <th>busID</th>
              <th>capacity</th>
            
            </tr>
          </thead>
          <tbody>
            {filteredBuses.map(bus => (
              <tr key={bus.id}>
                <td>{bus.busID}</td>
                <td>{bus.capacity}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </Popup>
    </Marker>
  );
}

export default BusHaltMarker;