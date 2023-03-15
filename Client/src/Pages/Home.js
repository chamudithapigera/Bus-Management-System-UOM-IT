import React from 'react'
import '../Css/home.scss';
import Sidebar  from '../Components/Sidebar';
import Navbar from '../Components/Navbar';



const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        
        </div>
      </div>
    
  );
};

export default Home;