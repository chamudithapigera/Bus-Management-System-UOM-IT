import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../Css/home.scss";
import image2 from "../Css/BUS_MANAGEMENT_SYSTEM.jpeg";
import "../Css/table.scss";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

const UnRegFilteredBuses = () => {
  const location = useLocation();
  const { filteredBuses, busStopName, routeNO } = location.state;
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can adjust this number based on your requirements

  const goBack = () => {
    navigate(-1);
  };

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
    <div className="home">
      <div className="homeContainer">
        <div className="items">
          <div className="item">
            <div>
              <Link to="/" style={{ textDecoration: "none" }}>
                <img src={image2} className="icontop" />
              </Link>
            </div>
            <div className="name">
              <p>TRAVO</p>
            </div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon
              className="icon"
              onClick={() => {
                navigate("/chat");
              }}
            />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <button onClick={() => navigate("/login")}>
              <span></span>Login
            </button>
          </div>
          <div className="item">
            <button onClick={() => navigate("/register")}>
              <span></span>Sign Up
            </button>
          </div>
        </div>

        <div className="containerTable">
          <div className="backButton" >
            <ArrowBackIosNewRoundedIcon
              onClick={goBack}
            />
          </div>
          <p className="text">Available Buses</p>
          <div>
            <table className="table">
              {/* Table content */}
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th >Bus ID</th>
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
                  //generates table rows dynamically based on the data
                  return (
                    <tr>
                      {/* represents the first cell in each row, which displays the row number/index */}
                      <th scope="row" key={index}>{index + 1}</th>
                      <td>{bus.busLocation.busID}</td>
                      <td>{busStopName}</td>
                      <td>{routeNO}</td>
                      <td>{bus.busLocation.routeName}</td>
                      {/* extracts the date portion of the arrival time */}
                      <td>{bus.arrivalTime.substr(0, 10)}</td>
                      <td>{bus.arrivalTime.substring(11, 19)}</td>
                      <td>
                        <RemoveRedEyeRoundedIcon onClick={async () => {
                          const busID = bus.busLocation.busID;
                          const routeName = bus.busLocation.routeName;
                          const duration = bus.duration;
                          const distance = bus.distance;
                          const arrivalTime = bus.arrivalTime.substring(11, 19);
                          navigate('/searchbus/unregfilteredbus/unregviewbus', { state: { busID, routeName, duration, distance, arrivalTime } });
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

export default UnRegFilteredBuses;
