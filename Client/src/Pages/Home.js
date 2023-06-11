import React, { useEffect, useState } from 'react';
import '../Css/home.scss';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import axios from "axios";
import WidgetDriver from '../Components/WidgetDriver';
import WidgetBus from '../Components/WidgetBus';
import WidgetTurn from '../Components/WidgetTurn';
import ChartComponent from '../Components/ChartComponent';

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

  {/*
  const [driverAttendanceData, setDriverAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch driver attendance data from the backend API
    axios.get('http://localhost:8080/api/v1/attendance/viewAll')
      .then((response) => {
        setDriverAttendanceData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching driver attendance data:', error);
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
        <div>
        
        </div>
        </div>

    </div>

  );
};

export default Home;
