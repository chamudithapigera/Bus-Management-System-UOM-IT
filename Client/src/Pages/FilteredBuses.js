import React from 'react';
import "../Css/filteredbus.scss"
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { useLocation } from 'react-router-dom';
import '../Css/table.scss';
import { useNavigate } from 'react-router-dom';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';

const FilteredBuses = (props) => {
  const location = useLocation();
  const { filteredBuses, busStopName, routeNO } = location.state;
  const navigate = useNavigate();

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <div className='containerTable'>
          <p className='text'>Available Buses</p>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
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
                {filteredBuses.map((bus, index) => {
                  return (
                    <tr>
                      <th scope="row" key={index}>{index + 1}</th>
                      <td>{bus.busLocation.busID}</td>
                      <td>{busStopName}</td>
                      <td>{routeNO}</td>
                      <td>{bus.busLocation.routeName}</td>
                      <td>{bus.arrivalTime.substr(0, 10)}</td>
                      <td>{bus.arrivalTime.substring(11, 19)}</td>
                      <td>
                        <RemoveRedEyeRoundedIcon onClick={async () => {
                          const busID = bus.busLocation.busID;
                          const routeName = bus.busLocation.routeName;
                          const duration = bus.duration;
                          const distance = bus.distance;
                          const arrivalTime = bus.arrivalTime.substring(11, 19);
                          navigate('/searchbus/viewbus', { state: { busID, routeName, duration, distance, arrivalTime } });
                        }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  );
};

export default FilteredBuses;