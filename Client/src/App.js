import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Bus from './Pages/Bus';
import AddBus from './Components/AddBus';
import BusRoute from './Pages/BusRoute';
import AddBusRoute from './Components/AddBusRoute';
import BusStop from './Pages/BusStop';
import Driver from './Pages/Driver';
import AddDriver from './Components/AddDriver';;


function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path='/'>
            <Route index element={<Home />} />
            <Route path="bus" element={<Bus />}/>
            <Route path="/addbus" element={<AddBus />} />
            <Route path="busRoute" element={<BusRoute />} />
            <Route path="/addRoute" element={<AddBusRoute />} />
            <Route path="busStop" element={<BusStop />} />
            <Route path="/addStop" element={<AddBusRoute />} />
            <Route path="driver" element={<Driver />} />
            <Route path="/addDriver" element={<AddDriver />} />
            
        </Route>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
