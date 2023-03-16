import "../Css/searchbus.scss"
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Map from "../Components/Map";
import { useState } from "react";


const SearchBus = () => {

  return (
    <div className="searchbus">
      <Sidebar />
      <div className="searchbusContainer">
        <Navbar/>
        <div className="map">
        <Map/>
        </div>
        
      </div>
    </div>
  );
};

export default SearchBus;