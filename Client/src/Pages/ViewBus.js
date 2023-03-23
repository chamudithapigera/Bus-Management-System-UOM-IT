import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Css/viewbus.scss"


const ViewBus = () => {

    return (
      <div className="viewbus">
        <Sidebar />
        <div className="viewbusContainer">
          <Navbar/>

          
          
        </div>
      </div>
    );
  };
  
  export default ViewBus;