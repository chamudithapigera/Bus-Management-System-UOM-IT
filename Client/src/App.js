import React from 'react';
import Home from './Pages/Home';
import FilteredBuses from './Pages/FilteredBuses';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
function App() {

  return (
    <div className="App">
    
    <Routes>
     
        <Route path="/" element={<Home/>} />
        <Route path="/filteredBuses" element={<FilteredBuses/>} />
      
      </Routes>
      
    </div>
  );
}

export default App;
