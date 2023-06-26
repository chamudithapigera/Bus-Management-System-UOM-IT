import "../Css/home.scss";
import image2 from "../Css/BUS_MANAGEMENT_SYSTEM.jpeg";
//import "../Css/viewbus.scss"
import image from "../Css/Bus_background.png"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { Modal, Button } from 'react-bootstrap';
import { useState } from "react";
import { faL } from "@fortawesome/free-solid-svg-icons";


const UnRegViewBus = () => {
  const location = useLocation();
  const { busID, routeName, duration, distance, arrivalTime } = location.state;
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);


  const closeModal = () => {
    setIsSuccess(false)
    navigate("/login");
  };


  const goBack = () => {
    navigate(-1);
  };

  const checkUserRegistration = () => {
  //  window.alert("Please LOGIN to enable notifications.");
    setIsSuccess(true);
 //   navigate('/login');
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
            <ChatBubbleOutlineOutlinedIcon className="icon"
            onClick={()=> {navigate('/chat')}} />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <button onClick={() => { navigate('/login') }}><span></span>Login</button>
          </div>
          <div className="item">
            <button onClick={() => { navigate('/register') }}><span></span>Sign Up</button>
          </div>
        </div>

        <div className="imageWrapper">
          <img src={image} alt="Background Image" />
          <div className="imageOverlay">
          <div className="backButton" >
          <ArrowBackIosNewRoundedIcon
              onClick={goBack}
            />
          </div>
            <div className="detailsBox">
              <table>
                <tr className="row1">
                  <td class="route-name">{busID}- {routeName}</td>
                  <td class="icon-column"><NotificationsNoneOutlinedIcon className="icon" onClick={checkUserRegistration} /></td>
                </tr>
                <tr className="row2">
                  <td class="arrival-time">Arrival_Time: {arrivalTime}</td>
                </tr>
                {/* The distance are converted from meters to kilometers and formatted to 2 decimal places */}
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

      <Modal
        show={isSuccess}
        onHide={() => setIsSuccess(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please LOGIN to enable notifications !</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => closeModal()}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default UnRegViewBus;


