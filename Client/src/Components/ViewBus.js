import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function ViewBus() {

    const [bus, setBus] = useState({
        busID: "",
        capacity: "",
        driverName: "",
        licenseNo:"",
      });
    
      const { id } = useParams();
    
      useEffect(() => {
        loadBus();
      }, []);
    
      const loadBus = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/bus_detail/${id}`);
        setBus(result.data);
      };

      
  return (

    <table className="table">
              <thead>
                <tr>
                  <th scope="col">BusID</th>
                  <th>Bus_Stop</th>
                  <th>Bus_RouteID</th>
                  <th>Bus_RouteNO</th>
                  <th>Bus_RouteName</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bus.map((bus) => (
                  <React.Fragment key={bus.id.timestamp}>
                    <tr>
                      <td >{bus.busID}</td>
                      <td>{bus.busStopName}</td>
                      <td>{bus.busRouteID[0].routeID}</td>
                      <td>{bus.busRouteID[0].routeNO}</td>
                      <td>{bus.busRouteID[0].routeName}</td>
                      
                      
                    </tr>
                    {bus.busRouteID.slice(1).map((route) => (
                      <tr key={route.r_id.timestamp}>
                        <td >{bus.busID}</td>
                        <td>{bus.busStopName}</td>
                        <td>{route.routeID}</td>
                        <td>{route.routeNO}</td>
                        <td>{route.routeName}</td>
                        
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>


    
        
  );
};

{/*<div>
      
      <p><strong>Bus ID:</strong> {bus.busID}</p>
      <p><strong>Capacity:</strong> {bus.capacity}</p>
      <p><strong>Driver Name:</strong> {bus.driver[0].driverName}</p>
      <p><strong>License No:</strong> {bus.driver[0].licenseNo}</p>
      <p><strong>Bus Stops:</strong></p>
      <ul>
        {bus.busStop.map(stop => (
          <li key={stop.id}>{stop.busStopName}</li>
        ))}
      </ul>
      <p><strong>Bus Route:</strong> {bus.busRoute[0].routeName}</p>
      
        </div>*/}



