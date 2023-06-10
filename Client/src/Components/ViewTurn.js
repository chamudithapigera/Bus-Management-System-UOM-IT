import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import '../Css/viewpage.scss';

export default function ViewBusTurn() {
  const [busTurns, setBusTurns] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loadBusTurns();
  }, []);

  const loadBusTurns = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/turn/${id}`);
      setBusTurns(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!busTurns) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <div className="detailsBox">
              <div className='h'>
                <h1>Bus Turn No {busTurns.turnNo}</h1>
              </div>
      <p><strong>Turn No :</strong> {busTurns.turnNo}</p>
      <p><strong>Turn Time:</strong> {busTurns.turnTime}</p>
      <p><strong>Route Name :</strong> {busTurns.routeName}</p>
      <p><strong>Driver ID:</strong> {busTurns.driverID}</p>
      
      </div>
    </div>
  );
}
