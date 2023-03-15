import React, { useState, useEffect } from 'react';
import "../Css/filteredbus.scss"
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

import Table from '../Components/Table.js';

const FilteredBuses = () => {
  

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar/>
        <Table/>
      </div>
    </div>
    
  );
};

export default FilteredBuses;



