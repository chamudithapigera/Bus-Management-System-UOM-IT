import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import '../Css/form.scss';

export default function UpdateDriver() {

    let navigate = useNavigate();

    const { id } = useParams();

    const [driver, setDriver] = useState({

        firstName: "",
        lastName: "",
        email: "",
        password: "",
        telephone: "",
        driverId: "",
        busId: ""

    });

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [error, setError] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const { firstName, lastName, email, password, telephone, driverId, busId } = driver

    const onInputChange = (e) => {
        setDriver({ ...driver, [e.target.name]: e.target.value }
        )
    };

    useEffect(() => {
        loadDriver();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        setShowConfirmationModal(true);
    };

    const handleConfirmUpdate = async () => {
        setShowConfirmationModal(false);
        try {
            await axios.put(`http://localhost:8080/api/v1/drivers/update/${id}`, driver);
            setShowSuccessModal(true);
        } catch (error) {
            showError("Failed to update driver ");
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
        navigate('/driver');
    };

    const loadDriver = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/drivers/viewone/${id}`);
        setDriver(result.data);
    };

    return (

        <div className='contrainer'>
            <div className="detailsBox">
                <div >
                    <h2 className='text-center m-4'>Update details of drivers</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3'>

                            <label htmlFor='firstName' className='label'>First Name </label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter First Name '
                                name='firstName'
                                value={firstName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='lastName' className='label'>Last Name </label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter Last Name '
                                name='lastName'
                                value={lastName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='email' className='label'>Email</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter email '
                                name='email'
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='password' className='label'>Password</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter password '
                                name='password'
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='telephone' className='label'>Phone No</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter phone no'
                                name='telephone'
                                value={telephone}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='driverId' className='label'>Driver ID </label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter Driver ID '
                                name='driverId'
                                value={driverId}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='busId' className='label'>Bus ID </label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='Enter Bus ID '
                                name='busId'
                                value={busId}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="button">Submit</button>
                        <Link to="/driver" style={{ textDecoration: "none" }}>Cancel</Link>
                    </form>
                </div>
            </div>
            <Modal show={showConfirmationModal} onHide={handleCloseModals} centered >
                <Modal.Header closeButton style={{ backgroundColor: "#5fb689" }}>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontFamily: "sans-serif" }}>
                    Are you sure you want to update this driver?
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
                    <p>Driver updated successfully!</p>
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
    )
}