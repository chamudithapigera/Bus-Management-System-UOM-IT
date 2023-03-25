import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Bus from './Pages/Bus';
import AddBus from './Components/AddBus';
import BusRoute from './Pages/BusRoute';
import AddBusRoute from './Components/AddBusRoute';
import AddBusStop from './Components/AddBusStop';
import BusStop from './Pages/BusStop';
import Driver from './Pages/Driver';
import AddDriver from './Components/AddDriver';
import { useContext, useState } from "react";
import { DarkModeContext } from './Components/darkModeContext';
import TurnSchedule from './Pages/TurnSchedule';
import AddTurn from './Components/AddTurn';
import DriverAttendance from './Pages/DriverAttendance';
import UpdateBusStop from './Components/UpdateBusStop';
import UpdateBusRoute from './Components/UpdateBusRoute';
import UpdateDriver from './Components/UpdateDriver';

function App() {
  const {darkMode}= useContext(DarkModeContext);
  return (
    <div className= {darkMode ? "app dark" : "app"}>
    
     <BrowserRouter>
      <Routes>
        <Route path='/'>
            <Route index element={<Home />} />
            <Route path="bus" element={<Bus/>}/>
            <Route path="/addbus" element={<AddBus />} />
            <Route path="busRoute" element={<BusRoute />} />
            <Route path="/addRoute" element={<AddBusRoute />} />
            <Route path="busStop" element={<BusStop />} />
            <Route path="/addStop" element={<AddBusStop />} />
            <Route path="driver" element={<Driver />} />
            <Route path="/addDriver" element={<AddDriver />} />
            <Route path="turn" element={<TurnSchedule />} />
            <Route path="/addTurn" element={<AddTurn />} />
            <Route path="/attendance" element={<DriverAttendance />} />
            <Route exact path="/updateStop/:id" element={<UpdateBusStop />} />
            <Route exact path="/updateDriver/:id" element={<UpdateDriver/>} />
            <Route exact path="/updateRoute/:id" element={<UpdateBusRoute/>} />

            
        </Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
