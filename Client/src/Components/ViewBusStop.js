import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import '../Css/viewpage.scss';


export default function ViewBusStop() {
  const [BusStops, setBusStops] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loadBusStops();
  }, []);

  const loadBusStops = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/busStop/viewone/${id}`);
      setBusStops(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!BusStops) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="detailsBox">
        <div className='h'>
          <h1>Bus Stop - {BusStops.busStopID}</h1>
        </div>
        <p><strong>Bus StopID  :</strong> {BusStops.busStopID}</p>
        <p><strong>Bus Stop Name:</strong> {BusStops.busStopName}</p>
        <p><strong>Longitude:</strong> {BusStops.longitude}</p>
        <p><strong>Latitude:</strong> {BusStops.latitude}</p>

      </div>
    </div>
  );
}
