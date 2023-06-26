import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/forms.scss';
import { Modal, Button } from 'react-bootstrap';

export default function AddBusRoute({ closeAddModal }) {

    let navigate = useNavigate()

    const [busStop, setBusStop] = useState({

        busStopID: "",
        busStopName: "",
        busID: ""

    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const closeModal = () => {
        setIsSuccess(false);
        navigate("/busStop");
    };

    const { busStopID, busStopName, busID } = busStop

    const onInputChange = (e) => {
        setBusStop({ ...busStop, [e.target.name]: e.target.value }
        )
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!busID) {
            showError("Please enter a value for Bus ID.")
        }
        else if (!busStopID) {
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
            try {
                await axios.post("http://localhost:8080/api/v1/busStop/addBusStop", busStop)
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
                            <label htmlFor='busStopID' className='label'>Bus Stop ID</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='e.g., B8-S3'
                                name='busStopID'
                                value={busStopID}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className='mb'>
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

                        <button type="submit" className="button">Submit</button>
                       
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
                    <p>Bus Stop added successfully!</p>
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
