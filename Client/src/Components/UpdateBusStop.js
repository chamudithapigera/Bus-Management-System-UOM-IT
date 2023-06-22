import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import '../Css/form.scss';

export default function UpdateBusStop() {

  let navigate = useNavigate();

  const { id } = useParams();

  const [stop, setStop] = useState({
    busStopID: "",
    busStopName: "",
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { busStopID, busStopName } = stop;

  const onInputChange = (e) => {
    setStop({ ...stop, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadBusStop();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!busStopID) {
      showError("Please enter a value for Bus Stop ID.")
    }
    else if (!/^B\d{1,4}-S\d{1,2}$/.test(busStopID)) {
      showError("Bus Stop ID should be in the format B#-R#.(e.g., B8-S3) ");
    }
    else if (!busStopName) {
      showError("Please enter a value for Bus Stop Name.");
    }
    else if (!/^[A-Za-z ]{1,100}$/.test(busStopName)) {
      showError("Bus Stop Name should only contain letters and have a maximum length of 100 characters.");
    }
    else {
      setShowConfirmationModal(true);
    }
  };

  const handleConfirmUpdate = async () => {
    setShowConfirmationModal(false);
    try {
      await axios.put(`http://localhost:8080/api/v1/busStop/${id}`, stop);
      setShowSuccessModal(true);
    } catch (error) {
      showError("Failed to update bus stop ");
    }
  };

  const showError = (errorMessage) => {
    setError(errorMessage);
    setShowErrorModal(true);
  };

  const handleCloseModals = () => {
    setShowConfirmationModal(false);
    setShowSuccessModal(false);
    setShowErrorModal(false);
    navigate('/busStop');
  };


  const loadBusStop = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/busStop/viewone/${id}`);
    setStop(result.data);
  };

  return (

    <div className='contrainer'>
      <div className="detailsBox">
        <div >
          <h2 className='text-center m-4'>Update details of bus-stops</h2>
          <form onSubmit={(e) => onSubmit(e)}>

            <div className='mb-3'>
              <label htmlFor='busStopID' className='label'>Bus Stop ID</label>
              <input
                type={"text"}
                className="input"
                placeholder='Enter bus  stop ID '
                name='busStopID'
                value={busStopID}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='busStopName' className='label'>Bus Stop Name</label>
              <input
                type={"text"}
                className="input"
                placeholder='Enter bus  stop name '
                name='busStopName'
                value={busStopName}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="button">Submit</button>
            <Link to="/busStop" style={{ textDecoration: "none" }}>Cancel</Link>
          </form>
        </div>
      </div>
      <Modal show={showConfirmationModal} onHide={handleCloseModals} centered >
        <Modal.Header closeButton style={{ backgroundColor: "#5fb689" }}>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: "sans-serif" }}>
          Are you sure you want to update this bus stop?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmUpdate}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={handleCloseModals} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#5fb689" }}>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: "sans-serif" }}>
          <p>Bus stop updated successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModals}>
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
  );
}

