import React,{useContext} from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Css/viewbus.scss"
import image from "../Css/Bus_background.png"
import { useLocation, useNavigate } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
//hare data and functionality across multiple components without passing props manually
import { UserContext } from '../Components/UserContext';
import axios from 'axios';


const ViewBus = () => {
  const { userData } = useContext(UserContext);
  {/* The userData may be undefined initially, so we use the || {} syntax 
  to provide an empty object as a fallback to avoid any errors when accessing email */}
  const { email } = userData || {};
  const location = useLocation();
  const { busID, routeName, duration, distance, arrivalTime } = location.state;
  const navigate = useNavigate();


// checks if a user is registered and enables a notification based on the user's registration status
const checkUserRegistration = async () => {
  try {
    
      const response = await axios.get(`http://localhost:8080/api/v1/passenger/users/${email}`);
      const user = response.data;

      if (user) {
        
          // User is registered, enable the notification and navigate to the notification page
          window.alert("Notification is ON");
          let notifyDistance = window.prompt('Enter the distance that you want to get the bus arrival notification(km)');
          navigate('/notification' , { state: { notifyDistance } });
        
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