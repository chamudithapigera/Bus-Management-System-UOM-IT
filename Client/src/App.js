import Home from "./pages/home/Home";
import Trip from "./pages/trip/Trip";
import Attendance from "./pages/attendance/Attendance";
import Breakdown from "./pages/breakdown/Breakdown";
import Delay from "./pages/delay/Delay";
import Turns from "./pages/turns/Turns";

import{
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">

            <Route index element={<Home/>}/>

            <Route path="attendance" element={<Attendance/>}/>

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
    </div>
  );
}

export default App;
