import "../Css/searchbus.scss"
import Sidebar from "../Components/Sidebar";
import Map from "../Components/Map";
import { useState } from "react";

const SearchBus = () => {

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        
        <Map/>
      </div>
    </div>
  );
};

export default SearchBus;