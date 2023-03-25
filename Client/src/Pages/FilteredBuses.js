import React from 'react';
import "../Css/filteredbus.scss"
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { Link, useLocation } from 'react-router-dom';
import '../Css/table.scss';

const FilteredBuses = () => {
  const location = useLocation();
  const { filteredBuses, busStopName, routeNO} = location.state;

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <div className='containerTable'>
          <p className='text'>Available Buses</p>
          <div >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Bus ID</th>
                  <th>Bus_Stop</th>
                  <th>Bus_RouteNO</th>
                  <th>Bus_RouteName</th>
                  <th>Arrival_Date</th>
                  <th>Arrival_Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBuses.map((bus,index) => (
                  <tr key={index}>
                    <td>{bus.busLocation.busID}</td>
                    <td>{busStopName}</td>
                    <td>{routeNO}</td>
                    <td>{bus.busLocation.routeName}</td>
                    <td>{bus.arrivalTime.substr(0, 10)}</td>
                    <td>{bus.arrivalTime.substring(11, 19)}</td>
                      <Link to="/searchbus/viewbus" style={{ textDecoration: "none" }}>
                        <td ><button>View</button></td>
                      </Link>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  );
};

export default FilteredBuses;



