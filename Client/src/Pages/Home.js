import React, { useEffect, useState } from 'react';
import '../Css/home.scss';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import axios from "axios";
import WidgetDriver from '../Components/WidgetDriver';
import WidgetBus from '../Components/WidgetBus';
import WidgetTurn from '../Components/WidgetTurn';
import { Line } from 'react-chartjs-2';


const Home = () => {

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className='widgets-container' >

          <div className='widgets-driver'>
            <WidgetDriver />
          </div>
          <div className='widgets-turn'>
            <WidgetTurn />
          </div>
          <div className='widgets-bus'>
            <WidgetBus />
          </div>
        </div >
      </div>


    </div>

  );
};

export default Home;




