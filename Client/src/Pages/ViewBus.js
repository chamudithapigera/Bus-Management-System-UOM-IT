import React, { useContext, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Css/viewbus.scss"
import image from "../Css/Bus_background.png"
import { useLocation, useNavigate } from 'react-router-dom';
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
//share data and functionality across multiple components without passing props manually
import { UserContext } from '../Components/UserContext';
import { Modal, Button,Form } from 'react-bootstrap';
import axios from 'axios';


const ViewBus = () => {
  const { userData } = useContext(UserContext);
  {/* The userData may be undefined initially, so we use the || {} syntax 
  to provide an empty object as a fallback to avoid any errors when accessing email */}
  const { email } = userData || {};
  const location = useLocation();
  const { busID, routeName, duration, distance, arrivalTime } = location.state;
  const navigate = useNavigate();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isAlert2ModalOpen, setIsAlert2ModalOpen] = useState(false);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [notifyDistance, setNotifyDistance] = useState("");

  const handleAlertModalClose = () => {
    setIsAlertModalOpen(false);
    setIsInputModalOpen(true);

  };

  const handleInput2ModalClose = () => {
    setIsInputModalOpen(false);
  
  };

  const handleInputModalClose = () => {
    const distance = notifyDistance; // Retrieve the input value
    setIsInputModalOpen(false);
    navigate("/notification", { state: { notifyDistance: distance } });

  };

  const handleAlert2ModalClose = () => {
    setIsAlert2ModalOpen(false);
    navigate("/register");
  };

  const handleNotifyDistanceChange = (event) => {
    setNotifyDistance(event.target.value);
  };

  const checkUserRegistration = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/passenger/users/${email}`);
      const user = response.data;

      if (user) {
        setIsAlertModalOpen(true);
      } else {
        setIsAlert2ModalOpen(true);

      }
    } catch (error) {
      console.error("Error fetching user information: ", error);
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
                  <td class="icon-column"><NotificationsNoneOutlinedIcon className="icon" onClick={checkUserRegistration} /></td>
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
        <Modal show={isAlertModalOpen} onHide={handleAlertModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>Notification is ON !</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleAlertModalClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={isInputModalOpen} onHide={handleInputModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Notification</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Form.Group controlId="notifyDistance">
              <Form.Label>Enter the distance to receive the bus arrival notification (km)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Distance in km"
                value={notifyDistance}
                onChange={handleNotifyDistanceChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" onClick={handleInput2ModalClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleInputModalClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={isAlert2ModalOpen} onHide={handleAlert2ModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Please register to enable notifications.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleAlert2ModalClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ViewBus;