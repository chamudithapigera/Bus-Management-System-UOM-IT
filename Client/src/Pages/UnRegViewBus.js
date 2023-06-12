import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Css/home.scss";
import image2 from "../Css/BUS_MANAGEMENT_SYSTEM.jpeg";
import UnRegMap from "../Components/UnRegMap";
import "../Css/viewbus.scss"
import image from "../Css/Bus_background.png"
import { Link, useLocation } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

    const location = useLocation();
    const { busID, routeName, duration, distance, arrivalTime } = location.state;
    const navigate = useNavigate();

    // Assuming you have an endpoint to fetch the user's information
const checkUserRegistration = async () => {
    try {
      // User is not registered, show an appropriate message or redirect to the registration page
      window.alert("Please LOGIN to enable notifications.");
      // Redirect to the registration page
      navigate('/login');
    } catch (error) {
      console.error('Error fetching user information: ', error);
    }
  };

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
          <div className="name"><p>TRAVO</p></div>
        </div>
    
        <div className="item">
            <button  onClick={()=> {navigate('/login')}}><span></span>Login</button>
          </div>
          <div className="item">
            <button  onClick={()=> {navigate('/register')}}><span></span>Sign Up</button>
          </div>
        </div>
       
        <div className="imageWrapper">
          <img src={image} alt="Background Image" />
          <div className="imageOverlay">
            <div className="detailsBox">
              <table>
                <tr className="row1">
                  <td class="route-name">{busID}- {routeName}</td>
                  <td class="icon-column"><NotificationsNoneOutlinedIcon className="icon" onClick={checkUserRegistration}/></td>
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

export default Home;


