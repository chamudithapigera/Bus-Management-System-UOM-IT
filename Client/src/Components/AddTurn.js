import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import '../Css/table.scss';
import '../Css/forms.scss';

export default function AddTurn() {

    let navigate = useNavigate()

    const timeRegex = /^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
    const routeNameRegex = /^[a-z]+(?:-[a-z]+)*$/;

    const [busTurn, setBusTurn] = useState({
        turnNo: "",
        turnTime: "",
        routeName: ""
    });

    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const closeModal = () => {
        setIsSuccess(false);
        navigate("/turn");
    };

    const { turnNo, turnTime, routeName } = busTurn

    const onInputChange = (e) => {
        setBusTurn({ ...busTurn, [e.target.name]: e.target.value }
        )
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!turnNo) {
            showError("Please enter a value for Turn No.")
        }
        else if (!/^T\d{1,3}$/.test(turnNo)) {
            showError("Turn No. should be in the format T#, T##, or T###.(e.g., T8))");
        }
        else if (!turnTime) {
            showError("Please enter a value for Turn Time.")
        }
        else if (!timeRegex.test(turnTime)) {
            showError("Turn Time should be in the format HH:MM (e.g., 09:30).");
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
                await axios.post("http://localhost:8080/api/v1/turn/addTurn", busTurn);
                setIsSuccess(true);
            }
            catch (error) {
                showError("Failed to update bus turn");
            }
        }
    }

    const showError = (errorMessage) => {
        setError(errorMessage);
        setShowErrorModal(true);
    };


    return (
        <div className='container1'>
            <div className='detailsBox'>
                <div >
                    <h3 >Add details of bus-turns</h3>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb'>
                            <label htmlFor='turnNo' className='label' rm>Turn No</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='e.g. "T5"  '
                                name='turnNo'
                                value={turnNo}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb'>
                            <label htmlFor='turnTime' className='label'>Turn Time</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='time format HH:MM.  (16.30)'
                                name='turnTime'
                                value={turnTime}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className='mb'>
                            <label htmlFor='routeName' className='label'>Route Name</label>
                            <input
                                type={"text"}
                                className="input"
                                placeholder='use simple letters  "katubedda-moratuwa"'
                                name='routeName'
                                value={routeName}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <button type="submit" className="button"  >Submit</button>
                        <Link to="/turn" style={{ textDecoration: "none" }}><button>Cancel</button></Link>

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
                    <p>Bus turn added successfully!</p>
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

