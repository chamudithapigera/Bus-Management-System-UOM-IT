import React, { useEffect, useState } from 'react';
import '../Css/home.scss';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Widget from '../Components/Widget';
import axios from "axios";
import WidgetDriver from '../Components/WidgetDriver';
import WidgetBus from '../Components/WidgetBus';
import WidgetTurn from '../Components/WidgetTurn';

const Home = () => {
  const [driverCount, setDriverCount] = useState(0);
  const [busCount, setBusCount] = useState(0);
  const [turnsCount, setTurnsCount] = useState(0);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [driverResponse, busResponse, turnsResponse] = await Promise.all([
        axios.get('http://localhost:8080/api/v1/drivers/count'),
        axios.get('http://localhost:8080/api/v1/bus_detail/count'),
        axios.get('http://localhost:8080/api/v1/turn/count'),
      ]);

      setDriverCount(driverResponse.data.count);
      setBusCount(busResponse.data.count);
      setTurnsCount(turnsResponse.data.count);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  {/*useEffect(() => {
    // Fetch driver count from the backend
    fetch('http://localhost:8080/api/v1/drivers/count')
      .then((response) => response.json())
      .then((data) => setDriverCount(data.driverCount))
      .catch((error) => {
        console.error('Error fetching driver count:', error);
      });

    
    // Fetch bus count from the backend
    fetch('http://localhost:8080/api/v1/bus_detail/count')
      .then((response) => response.json())
      .then((data) => setBusCount(data.busCount))
      .catch((error) => {
        console.error('Error fetching bus count:', error);
      });

    // Fetch turns count from the backend
    fetch('http://localhost:8080/api/v1/turn/count')
      .then((response) => response.json())
      .then((data) => setTurnsCount(data.turnsCount))
      .catch((error) => {
        console.error('Error fetching turns count:', error);
      });
  }, []);

*/}

  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
        <div className="widgets-container">
          <WidgetDriver />
          < WidgetBus />
          <WidgetTurn />
        </div>
        </div>

    </div>

  );
};

export default Home;
