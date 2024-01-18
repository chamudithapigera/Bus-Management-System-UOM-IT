import React,{useState} from 'react';
import "../Css/filteredbus.scss"
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { useLocation, useNavigate } from 'react-router-dom';
import '../Css/table.scss';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';

const FilteredBuses = () => {
  const location = useLocation();
  const { filteredBuses, busStopName, routeNO } = location.state;
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can adjust this number based on your requirements

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBuses.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredBuses.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
                {currentItems.map((bus, index) => {
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
                          navigate('/searchbus/filteredbus/viewbus', { state: { busID, routeName, duration, distance, arrivalTime } });
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
        <div className="pagination">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>

  );
};

export default FilteredBuses;