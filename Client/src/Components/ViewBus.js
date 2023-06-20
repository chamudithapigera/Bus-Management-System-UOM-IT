import React, {useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import '../Css/viewpage.scss';

export default function ViewBus() {
  const [bus, setBus] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    loadBus();
  }, []);

  const loadBus = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/bus_detail/${id}`);
      setBus(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!bus) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="detailsBox">
        <div className='h'>
          <h1>Bus - {bus.busID}</h1>
        </div>
        <div className='form'>
          <p>
            <strong>Bus ID:</strong> {bus.busID}
          </p>
          <p>
            <strong>Capacity:</strong> {bus.capacity}
          </p>
         
          {bus.busStop && bus.busStop.length >= 0 && (
            <React.Fragment>
              <p>
                <strong>Bus Stops:</strong>
              </p>
              <ul>
                {bus.busStop.map((stop) => (
                  <li key={stop.id}>
                    {stop.busStopID}    {stop.busStopName} 
                  </li>
                ))}
              </ul>
            </React.Fragment>
          )}
          {bus.busRoute && bus.busRoute.length >= 0 && (
            <React.Fragment>
              <p>
                <strong>Bus Route:</strong>
              </p>
              <ul>
                {bus.busRoute.map((route) => (
                  <li key={route.id}>
                    {route.routeID}    {route.routeName}
                  </li>
                ))}
              </ul>
            </React.Fragment>
          )}
         
        </div>
     
      </div>
    </div>
  );
}
