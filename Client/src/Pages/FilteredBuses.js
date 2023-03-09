import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../Components/Table.js';

const FilteredBuses = () => {
  
 
    const [data, setData] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:8080/api/v1/buses/getBusbyHaltName/${haltName}')
        .then(response => setData(response.data))
        .catch(error => console.log(error));
    }, []);

  return (
    <div>
      <h1>Filtered Buses</h1>
      <Table data={data} />
    </div>
  );
};

export default FilteredBuses;



