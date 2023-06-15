import React from 'react';
import '../Css/home.scss';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import WidgetDriver from '../Components/WidgetDriver';
import WidgetBus from '../Components/WidgetBus';
import WidgetTurn from '../Components/WidgetTurn';
import WidgetDriverAttendance from '../Components/WidgetDriverAttendance';


const Home = () => {

  return (

    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className='widgets-container' >
          <div className='widgets-turn-attendance'>
            <div className='widgets-turn'>
              <WidgetTurn />
            </div>
            <div>
              <WidgetDriverAttendance />
            </div>
          </div>
          <div className='widgets-bus-driver'>
            <div className='widgets-driver'>
              <WidgetDriver />
            </div>
            <div>
              <WidgetBus />
            </div>
          </div>
        </div >
      </div>
    </div>

  );
};

export default Home;




