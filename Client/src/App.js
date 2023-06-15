import React, { useState } from 'react';
import Home from "./pages/home/Home";
import Trip from "./pages/trip/Trip";
import Attendance from "./pages/attendance/Attendance";
import Breakdown from "./pages/breakdown/Breakdown";
import Delay from "./pages/delay/Delay";
import Turns from "./pages/turns/Turns";
import Maps from "./components/map/Map";
import { DriverContext } from './pages/driver/DriverContext';

import{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [driverID, setDriverID] = useState(null); // create a state for driverID

  return (
    <div className="App">
      <DriverContext.Provider value={{ driverID, setDriverID }}> {/* provide driverID and setDriverID to child components */}
        <BrowserRouter>
          <Routes>
            <Route path="/">

              <Route index element={<Home/>}/>

              <Route path="attendance" element={<Attendance/>}/>
              <Route path="map" element={<Maps/>}/>

              <Route path="turns">
                <Route index element={<Turns/>}/>
                <Route path="trip" element={<Trip/>}/>
              </Route>

              <Route path="breakdown">
                <Route index element={<Breakdown/>}/>
                <Route path="delay" element={<Delay/>}/>
                
              </Route>

            </Route>
          </Routes>
        </BrowserRouter>
      </DriverContext.Provider> {/* end of provider */}
    </div>
  );
}

export default App;
