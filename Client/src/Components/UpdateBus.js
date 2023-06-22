import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import '../Css/form.scss';

export default function UpdateBus() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [bus, setBus] = useState({
        busID: "",
        capacity: ""
    });

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [error, setError] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

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
            setShowConfirmationModal(true);
        }
    };

    const handleConfirmUpdate = async () => {
        setShowConfirmationModal(false);
        try {
            await axios.put(`http://localhost:8080/api/v1/bus_detail/${id}`, bus);
            setShowSuccessModal(true);
        } catch (error) {
            showError("Failed to update bus ");
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
        navigate('/bus');
    };

    useEffect(() => {
        loadBus();
    }, []);

    const loadBus = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/bus_detail/${id}`);
        setBus(result.data);
    };

    return (
        <div className='contrainer'>
            <div className="detailsBox">
                <div>
                    <h2>Update details of buses</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='busID' className='label'>Bus ID</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter bus ID'
                                name='busID'
                                value={busID}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
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
                        <Link style={{ textDecoration: "none" }} to="/bus">
                            <button>Cancel</button>
                        </Link>
                    </form>
                </div>
            </div>

            <Modal show={showConfirmationModal} onHide={handleCloseModals} centered >
                <Modal.Header closeButton style={{ backgroundColor: "#5fb689" }}>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontFamily: "sans-serif" }}>
                    Are you sure you want to update this bus?
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
                    <p>Bus updated successfully!</p>
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
