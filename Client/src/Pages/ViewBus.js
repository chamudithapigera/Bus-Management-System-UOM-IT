import React,{useContext} from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Css/viewbus.scss"
import image from "../Css/Bus_background.png"
import { Link, useLocation } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Components/UserContext';

import axios from 'axios';


const ViewBus = (props) => {
  const { userData } = useContext(UserContext);
  const { email } = userData || {};
  const location = useLocation();
  const { busID, routeName, duration, distance, arrivalTime } = location.state;
  const navigate = useNavigate();


// Assuming you have an endpoint to fetch the user's information
const checkUserRegistration = async () => {
  try {
    let isNotificationShown = false; // Flag to track if the notification has been shown
    
      const response = await axios.get(`http://localhost:8080/api/v1/passenger/users/${email}`);
      const user = response.data;
      if (user) {
        //(user.isRegistered) check flag is true or false..........................

        if (!isNotificationShown) {
          // User is registered, enable the notification and navigate to the notification page
          window.alert("Notification is ON");
          let notifyDistance = window.prompt('Enter the distance that you want to get the bus arrival notification(km)');
          navigate('/notification');
          isNotificationShown = true; // Set the flag to true so that the notification is not shown again
        }
      } else {
        // User is not registered, show an appropriate message or redirect to the registration page
        window.alert("Please register to enable notifications.");
        // Redirect to the registration page
        navigate('/register');
      }
      
    }
   catch (error) {
    console.error('Error fetching user information: ', error);
  }
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
                  <td class="route-name">{busID}- {routeName}</td>
                  <td class="icon-column"><NotificationsNoneOutlinedIcon className="icon"  onClick={checkUserRegistration} /></td>
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