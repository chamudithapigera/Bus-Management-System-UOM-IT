import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import '../Css/viewpage.scss';

export default function ViewBusRoute() {
  const [busRoutes, setBusRoute] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loadBusRoute();
  }, []);

  const loadBusRoute = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/busRoute/viewone/${id}`);
      setBusRoute(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!busRoutes) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <div className="detailsBox">
        <div className='h'>
          <h1>Bus Route - {busRoutes.routeID}</h1>
        </div>
        <p><strong>Route ID :</strong>{busRoutes.routeID} </p>
        <p><strong>Route NO:</strong> {busRoutes.routeNO}</p>
        <p><strong>Route Name:</strong> {busRoutes.routeName}</p>

      </div>
    </div>

  );
}
