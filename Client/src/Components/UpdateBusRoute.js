import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import '../Css/form.scss';

export default function UpdateBusRoute() {

    let navigate = useNavigate();

    const routeNameRegex = /^[a-z]+(?:-[a-z]+)*$/;

    const { id } = useParams();

    const [route, setRoute] = useState({
        routeID: "",
        routeNO: "",
        routeName: ""
    });

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

    const { routeID, routeNO, routeName } = route;

    const onInputChange = (e) => {
        setRoute({ ...route, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadBusRoute();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!routeID) {
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
        } else {
            setShowConfirmationModal(true);
        }
    };

    const handleConfirmUpdate = async () => {
        setShowConfirmationModal(false);
        try {
          await axios.put(`http://localhost:8080/api/v1/busRoute/${id}`, route);
          setShowSuccessModal(true);
        } catch (error) {
            showError("Failed to update bus route");
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
        navigate('/busRoute');
      };


    const loadBusRoute = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/busRoute/viewone/${id}`);
        setRoute(result.data);
    };

    return (

        <div className='contrainer' >
            <div className="detailsBox">

                <h2 className='text-center m-4'>
                    Update Bus Route
                </h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='routeID' className='label' rm>Route ID</label>
                        <input
                            type={"text"}
                            className="input"
                            placeholder='Enter route ID '
                            name='routeID'
                            value={routeID}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className='mb-3'>
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
                    <div className='mb-3'>
                        <label htmlFor='routeName' className='label'>Route Name</label>
                        <input
                            type={"text"}
                            className="input"
                            placeholder='Enter route name'
                            name='routeName'
                            value={routeName}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>



                    <button type='submit' className='button'>Update</button>
                    <Link to="/busRoute" style={{ textDecoration: "none" }}>Cancel</Link>
                </form>
            </div>
            <Modal show={showConfirmationModal} onHide={handleCloseModals} centered >
                <Modal.Header closeButton style={{ backgroundColor: "#5fb689" }}>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontFamily: "sans-serif" }}>
                    Are you sure you want to update this bus route?
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
                    <p>Bus route updated successfully!</p>
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

