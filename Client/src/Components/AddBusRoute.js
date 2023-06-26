import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/forms.scss';
import { Modal, Button } from 'react-bootstrap';

export default function AddBusRoute({closeAddModal}) {

  let navigate = useNavigate()

  const routeNameRegex = /^[a-z]+(?:-[a-z]+)*$/;

  const [busRoute, setBusRoute] = useState({

    routeID: "",
    routeNO: "",
    routeName: "",
    busID: ""

  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const closeModal = () => {
    setIsSuccess(false);
    navigate("/busRoute");
  };

  const { routeID, routeNO, routeName, busID } = busRoute

  const onInputChange = (e) => {
    setBusRoute({ ...busRoute, [e.target.name]: e.target.value }
    )
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!busID) {
      showError("Please enter a value for Bus ID.")
    }
    else if (!/^B\d{1,4}$/.test(busID)) {
      showError("Bus ID should be in the format B#### with a maximum length of 5 characters. (e.g., B8)");
    }
    else if (!routeID) {
      showError("Please enter a value for Bus Route ID.")
    }
    else if (!/^B\d{1,4}-R\d{1,2}$/.test(routeID)) {
      showError("Bus Route ID should be in the format B#-R#.(e.g., B8-R3) ");
    }
    else if (routeNO && (!/^\d{1,3}$/.test(routeNO))) {
      showError("Route Number should be a number with a maximum of three digits.");
    }
    else if (!routeName) {
      showError("Please enter a value for Route Name.")
    }
    else if (
      routeName.length >= 100 || !routeNameRegex.test(routeName)) {
      showError(
        "Route Name should only contain simple letters and a hyphen (-), with a maximum length of 100 characters.(e.g., katubedda-moratuwa)"
      );
    }
    else {
      try {
        await axios.post("http://localhost:8080/api/v1/busRoute/addRoute", busRoute)
        closeAddModal();
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          showError(error.response.data.message);
        } else {
          showError("An error occurred while adding the bus route.");
        }
      }

    }

  }

  const showError = (errorMessage) => {
    setError(errorMessage);
    setShowErrorModal(true);
  };

  return (
    <div className='container1'>
      <div >
        <div >
          
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb'>
              <label htmlFor='routeID' className='label' rm>Route ID</label>
              <input
                type={"text"}
                className="input"
                placeholder='e.g., B8-R3 '
                name='routeID'
                value={routeID}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className='mb'>
              <label htmlFor='routeNO' className='label'>Route NO</label>
              <input
                type={"text"}
                className="input"
                placeholder='Enter route no'
                name='routeNO'
                value={routeNO}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className='mb'>
              <label htmlFor='routeName' className='label'>Route Name</label>
              <input
                type={"text"}
                className="input"
                placeholder='use simple letters  "katubedda-moratuwa'
                name='routeName'
                value={routeName}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='mb'>
              <label htmlFor='busID' className='label'>Bus ID</label>
              <input
                type={"text"}
                className="input"
                placeholder='e.g., B8'
                name='busID'
                value={busID}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="button"  >Submit</button>

          </form>
        </div>
      </div>
      <Modal
        show={isSuccess}
        onHide={() => setIsSuccess(false)}
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: "#5fb689" }}>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: "sans-serif" }}>
          <p>Bus Route added successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => closeModal()}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        centered
      >
        <Modal.Header closeButton style={{ backgroundColor: "#4ca1c6e1" }}>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: "sans-serif" }}>
          <p>{error}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowErrorModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
