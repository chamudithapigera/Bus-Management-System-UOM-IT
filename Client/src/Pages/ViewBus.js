import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Css/viewbus.scss"
import image from "../Css/Bus_background.png"
import { Link, useLocation } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useNavigate } from 'react-router-dom';


const ViewBus = (props) => {
  const location = useLocation();
  const { busID, routeName, duration, distance, arrivalTime } = location.state;
  const navigate = useNavigate();

  //requests permission to send notifications and navigates to the notification page if permission is granted.
  const handleNotificationClick = () => {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        window.alert("Notification is ON");
        navigate('/notification')
      }
    });
  };


  return (
    <div className="viewbus">
      <Sidebar />
      <div className="viewbusContainer">
        <Navbar />
        <div className="imageWrapper">
          <img src={image} alt="Background Image" />
          <div className="imageOverlay">
            <div className="detailsBox">
              <table>
                <tr className="row1">
                  <td class="route-name">{routeName}</td>
                  <td class="icon-column"><NotificationsNoneOutlinedIcon className="icon"  onClick={handleNotificationClick} /></td>
                </tr>
                <tr className="row2">
                <td class="arrival-time">Arrival_Time: {arrivalTime}</td>
                </tr>
                {/* The distance are converted from meters to kilometers */}
                <tr className="row2">
                  <td class="distance">Distance: {(distance / 1000).toFixed(2)} km</td>
                </tr>
                {/* The duration are converted from seconds to minutes */}
                <tr className="row2">
                  <td class="duration">Duration: {(duration / 60).toFixed(2)} min</td>
                </tr>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewBus;