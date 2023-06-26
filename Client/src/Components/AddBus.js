import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import '../Css/forms.scss';


export default function AddBus({ closeAddModal }) {
  let navigate = useNavigate();

  const [bus, setBus] = useState({
    busID: "",
    capacity: ""
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  
  const closeModal = () => {
    setIsSuccess(false);
    navigate("/bus");
  };

  const { busID, capacity } = bus;

  const onInputChange = (e) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!busID) {
      showError("Please enter a value for Bus ID.");
    } else if (!/^B\d{1,4}$/.test(busID)) {
      showError("Bus ID should be in the format B#### with a maximum length of 5 characters. (e.g., B8)");
    } else if (capacity && (!/^\d+$/.test(capacity) || Number(capacity) >= 100)) {
      showError("Capacity should be a number less than 100.");
    } else {
      try {
        await axios.post("http://localhost:8080/api/v1/bus_detail/addBus", bus);
        closeAddModal();
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          showError(error.response.data.message);
        } else {
          showError("An error occurred while adding the bus.");
        }
      }
    }
  };

  const showError = (errorMessage) => {
    setError(errorMessage);
    setShowErrorModal(true);
  };

  return (
    <div className='container1'>
      <div >
        <div>
          
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb'>
              <label htmlFor='busID' className='label'>Bus ID</label>
              <input
                type={"text"}
                className="input"
                placeholder='e.g. B2'
                name='busID'
                value={busID}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='mb'>
              <label htmlFor='capacity' className='label'>Capacity</label>
              <input
                type={"text"}
                className="input"
                placeholder='Enter no of seats'
                name='capacity'
                value={capacity}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="button">Submit</button>
           
          </form>
        </div>
      </div>

      <Modal
        show={isSuccess}
        onHide={() => setIsSuccess(false)}
        centered
      >
        <Modal.Header closeButton style={{backgroundColor:"#5fb689"}}>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontFamily:"sans-serif"}}>
          <p>Bus added successfully!</p>
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
        <Modal.Header closeButton style={{backgroundColor:"#4ca1c6e1"}}>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{fontFamily:"sans-serif"}}>
          <p>{error}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowErrorModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
